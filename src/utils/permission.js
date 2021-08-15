/* eslint-disable no-param-reassign */
/**
 * @description: 角色对应的权限名称
 * @param {*}
 * @return {*}
 */
const roleRoute = {
  admin: [
    {
      name: 'Product',
    }, {
      name: 'ProductList',
    }, {
      name: 'ProductAdd',
    }, {
      name: 'Category',
    },
  ],
  coustomer: [
    {
      name: 'Product',
    }, {
      name: 'ProductList',
    }, {
      name: 'ProductAdd',
    },
  ],
};

// 导出一个符合角色权限的路由
export default function getMenuRoute(role, routes) {
  // 1. 进行获取上面设定的符合角色权限的路由的name
  const allowMenuRoutes = roleRoute[role].map((it) => it.name);
  // 2. 进行过滤，深层次过滤（子路由也进行过滤），  得到的 resultRoute 是一个数组
  const resultRoute = routes.filter((item) => {
    // 如果设定的权限中拥有该路由的权限
    if (allowMenuRoutes.indexOf(item.name) !== -1) {
      //  const {children} = item   --->  cosnt chilren = item.children
      const { children } = item;
      // 过滤得到该路由的子路由中符合权限的路由
      item.children = children.filter((prop) => allowMenuRoutes.indexOf(prop.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoute;
}
