import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import EnterNameView from '@/views/EnterNameView.vue'
import PostView from '@/views/PostView.vue'
import UserProfileView from '@/views/UserProfileView.vue'
import CreatePostView from '@/views/CreatePostView.vue'

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
    },
    {
      path: '/:username',
      name: 'user-profile',
      component: UserProfileView,
    },
    {
      path: '/new',
      name: 'create-post',
      component: CreatePostView,
    },
  ],
})

export default router
