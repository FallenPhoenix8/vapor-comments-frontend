import Discussion from "~/class/Discussion"
import Participant from "~/class/Participant"

export default async (discussionId: string) => {
  const { data: discussionDetails } = await useAsyncData(
    `discussion-details-${discussionId}`,
    () => Discussion.getDiscussionWithDetails(discussionId)
  )

  const lastPong = ref(Date.now())
  const heartbeatTimeout = 1000 // ms: max time to wait for pong after ping

  // Connection state management
  const connectionState = ref<
    "connecting" | "connected" | "disconnected" | "error"
  >("connecting")
  const reconnectAttempts = ref(0)
  const maxReconnectAttempts = 5
  const reconnectDelay = 1000

  let socket: WebSocket | null = null
  let reconnectTimer: NodeJS.Timeout | null = null
  let heartbeatTimer: NodeJS.Timeout | null = null

  const createConnection = () => {
    if (socket?.readyState === WebSocket.OPEN) {
      return // Already connected
    }

    connectionState.value = "connecting"

    try {
      socket = new WebSocket(
        `${useRuntimeConfig().public.apiUrl}/api/discussions/${discussionId}/ws`
      )

      socket.addEventListener("open", () => {
        console.log(
          `Successfully connected to socket of discussion ${discussionId}.`
        )
        connectionState.value = "connected"
        reconnectAttempts.value = 0

        // Start heartbeat to keep connection alive
        startHeartbeat()
      })

      socket.addEventListener("message", async (message) => {
        try {
          const detailsJSON = await message.data.text()
          const details = JSON.parse(detailsJSON)

          // Handle different message types
          if (details.type === "discussion-update") {
            delete details.type
            discussionDetails.value = details
            console.log(
              "Discussion updated in WebSocket:",
              discussionDetails.value
            )
          } else if (details.type === "pong") {
            lastPong.value = Date.now()
            return
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error)
        }
      })

      socket.addEventListener("close", (event) => {
        console.log(
          `WebSocket connection closed for discussion ${discussionId}`,
          {
            code: event.code,
            reason: event.reason,
          }
        )
        connectionState.value = "disconnected"
        stopHeartbeat()

        // Only attempt reconnect if it wasn't a manual close (code 1000)
        if (event.code !== 1000) {
          attemptReconnect()
        }
      })

      socket.addEventListener("error", (error) => {
        console.error(`WebSocket error for discussion ${discussionId}:`, error)
        connectionState.value = "error"
        stopHeartbeat()
        attemptReconnect()
      })
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error)
      connectionState.value = "error"
      attemptReconnect()
    }
  }

  const attemptReconnect = () => {
    if (reconnectAttempts.value >= maxReconnectAttempts) {
      console.log("Max reconnection attempts reached")
      return
    }

    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
    }

    reconnectAttempts.value++
    const delay = reconnectDelay * Math.pow(2, reconnectAttempts.value - 1) // Exponential backoff

    console.log(
      `Attempting to reconnect in ${delay}ms... (${reconnectAttempts.value}/${maxReconnectAttempts})`
    )

    reconnectTimer = setTimeout(() => {
      createConnection()
    }, delay)
  }

  const startHeartbeat = () => {
    if (heartbeatTimer) return

    heartbeatTimer = setInterval(async () => {
      console.log("Sending heartbeat...")
      let participant = await Participant.getParticipantByUserId(
        discussionId,
        useUser().user?.id as string
      )
      sendMessage({
        type: "heartbeat",
        participantId: participant.id,
      })
    }, heartbeatTimeout)
  }

  const stopHeartbeat = () => {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
      heartbeatTimer = null
    }
  }

  const sendMessage = (message: any) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message))
      return true
    } else {
      console.warn("WebSocket is not connected. Message not sent:", message)
      return false
    }
  }

  const disconnect = (message?: string) => {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }

    stopHeartbeat()

    if (socket) {
      socket.close(1000, message ? message : "Manual disconnect")
      socket = null
    }

    connectionState.value = "disconnected"
  }

  const reconnect = () => {
    disconnect()
    reconnectAttempts.value = 0
    createConnection()
  }

  // Initialize connection
  createConnection()

  // Cleanup on component unmount
  onUnmounted(() => {
    disconnect()
  })

  // Handle page visibility changes (optional - pause/resume on tab switch)
  if (import.meta.client) {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden - optionally pause heartbeat or close connection
        stopHeartbeat()
      } else {
        // Page is visible again - resume heartbeat or reconnect
        if (socket?.readyState === WebSocket.OPEN) {
          startHeartbeat()
        } else {
          createConnection()
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    onUnmounted(() => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    })
  }

  const discussion = reactive({
    details: discussionDetails,
    connectionState: readonly(connectionState),
    reconnectAttempts: readonly(reconnectAttempts),

    // Methods
    sendMessage,
    disconnect,
    reconnect,

    // Computed properties
    isConnected: computed(() => connectionState.value === "connected"),
    isConnecting: computed(() => connectionState.value === "connecting"),
    isDisconnected: computed(() => connectionState.value === "disconnected"),
    hasError: computed(() => connectionState.value === "error"),
  })

  return discussion
}
