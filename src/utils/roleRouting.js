export const ROLES = { ADMIN: 1, USER: 2, EMPLEADO: 3 };

export const goByRole = (rolId) => {
  switch (rolId) {
    case ROLES.ADMIN:    return "/admin";
    case ROLES.EMPLEADO: return "/empleado";
    case ROLES.USER:
    default:             return "/dashboard";
  }
};
