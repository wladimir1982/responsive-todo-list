const routes = {
  home: '/',
  todoList: {
    list: '/todoList',
    details: {
      path: '/todoList/:id',
      link: (id: string) => `/todoList/${id}`
    }
  }
};

export default routes;
