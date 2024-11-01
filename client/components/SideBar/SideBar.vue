<template>
  <div class="sidebar">
    <nav>
      <ul>
        <li>
          <router-link to="/post-observation">
            <img src="../../assets/images/make-observation.svg" class="icon" />
          </router-link>
        </li>
        <li>
          <router-link to="/map">
            <img src="../../assets/images/map.svg" class="icon inverted-icon" />
          </router-link>
        </li>
        <li>
          <router-link to="/observations">
            <img src="../../assets/images/observations.svg" class="icon inverted-icon" />
          </router-link>
        </li>
       
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  background-color: #386641;
  padding: 20px;
  height: calc(100vh - 64px); /* Adjust height to fit under navbar */
  width: var(--sidebar-width); /* Adjusted width to make it less wide */
  position: fixed; /* Fixed position to keep it on the left */
  top: 64px; /* Align it below the navbar */
  left: 0; /* Align to the left edge */
  overflow-y: auto; /* Allow scrolling if content overflows */
}

.icon {
  width: 48px; /* Set a reasonable width */
  height: 48px; /* Set a reasonable height */
  transition: transform 0.2s ease; /* Smooth transition for transform */
}

.inverted-icon {
  filter: invert(100%);
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  height: 100%; /* Take full height of sidebar */
  display: flex;
  flex-direction: column; /* Stack items vertically */
  justify-content: space-between; /* Distribute items evenly */
  align-items: center; /* Center icons horizontally */
}

nav ul li {
  margin: 15px 0;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

nav ul li a:hover {
  text-decoration: underline;
}

/* Add hover effect to icons */
nav ul li:hover .icon {
  transform: translateY(-5px); /* Move icon up by 5px */
}
</style>
