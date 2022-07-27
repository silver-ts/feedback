import { createRouter, createWebHistory } from 'vue-router'

import NotFound from '@/components/NotFound.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import EnterNameView from '@/views/EnterNameView.vue'
import PostView from '@/views/PostView.vue'
import UserProfileView from '@/views/UserProfileView.vue'
import CreatePostView from '@/views/CreatePostView.vue'
import AdminView from '@/views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/enter-username',
      name: 'enter-username',
      component: EnterNameView,
    },
    {
      path: '/:username/:postId',
      name: 'user-post',
      component: PostView,
      props: true,
    },
    {
      path: '/:username',
      name: 'user-profile',
      component: UserProfileView,
      props: true,
    },
    {
      path: '/new',
      name: 'create-post',
      component: CreatePostView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
    },
    {
      path: '/admin/:postId',
      name: 'edit-post',
      component: CreatePostView,
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
})

export default router
