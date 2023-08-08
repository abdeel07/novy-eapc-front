function hasPermission(permissions, permitted) {
    return permitted?.includes(permissions)
  }
  
  function Role({ permitted, children }) {
    const { data = {} } = {} // a remplacer par les informations user
    const permissions = data?.role || ''
    const isAuthorised = hasPermission(permissions, permitted)
    return isAuthorised ? children: null;
  }
  
  export default Role
  