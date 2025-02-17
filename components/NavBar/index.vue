<template>
  <nav
    class="fixed top-4 left-0 right-0 flex justify-between items-center px-5"
  >
    <NavBarWrapper>
      <NavBarItem>Contact us</NavBarItem>
    </NavBarWrapper>
    <NavBarWrapper>
      <NavBarItem>About</NavBarItem>
      <NavBarItem :is-icon="true">
        <Icon
          name="mingcute:home-3-fill"
          class="h-10 w-10 hover:text-primary group-hover:text-primary group-focus:text-primary dark:hover:text-primary-darker dark:group-hover:text-primary-darker dark:group-focus:text-primary-darker"
          mode="svg"
        />
      </NavBarItem>
      <NavBarItem>Features</NavBarItem>
    </NavBarWrapper>
    <NavBarWrapper>
      <NavBarItem :complementary="true">Register</NavBarItem>
    </NavBarWrapper>
  </nav>
</template>
