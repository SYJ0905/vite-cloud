<script setup lang="ts">
import { LOGIN_TOKEN } from '@/plugins/cookies';
import {
  API_DELETE_MESSAGE,
  API_DELETE_REPLY_MESSAGE,
  API_GET_MESSAGES,
  API_GET_USERLIST,
  API_GET_USER_DETAIL,
  API_POST_LOGIN,
  API_POST_MESSAGE,
  API_POST_REGISTER,
  API_POST_REPLY_MESSAGE,
  API_UPDATE_MESSAGE,
  API_UPDATE_REPLY_MESSAGE,
} from '@/plugins/api';

const registerData = ref({
  name: '',
  age: 0,
  email: '',
  password: '',
});
async function register() {
  const payload = registerData.value;
  try {
    const response = await API_POST_REGISTER(payload);
    console.log('register response =>', response);
  }
  catch (error) {
    console.log('error =>', error);
  }
}

const loginData = ref({
  email: '',
  password: '',
});
async function login() {
  const payload = loginData.value;
  try {
    const response = await API_POST_LOGIN(payload);
    console.log('login response =>', response);
    if (response.status === 200)
      await LOGIN_TOKEN.set(response.data.data.token);
  }
  catch (error) {
    console.log('error =>', error);
  }
}

const loginId = ref('');
async function get_user() {
  try {
    const response = await API_GET_USER_DETAIL(loginId.value);
    console.log('get_user response =>', response);
  }
  catch (error) {
    console.log('error =>', error);
  }
}

async function get_user_list() {
  try {
    const response = await API_GET_USERLIST();
    console.log('get_user_list response =>', response);
  }
  catch (error) {
    console.log('error =>', error);
  }
}

async function get_message_list() {
  try {
    const response = await API_GET_MESSAGES();
    console.log('get_message_list response =>', response);
  }
  catch (error) {
    console.log('error =>', error);
  }
}

const message = ref('');
const messageId = ref('');
async function send_message() {
  const payload = {
    content: message.value,
  };
  try {
    const response = await API_POST_MESSAGE(payload);
    console.log('send_message response =>', response);
  }
  catch (error) {
    console.log('error =>', error);
  }
}

async function update_message() {
  const payload = {
    message_id: messageId.value,
    content: message.value,
  };
  try {
    const response = await API_UPDATE_MESSAGE(payload);
    console.log('send_message response =>', response);
  }
  catch (error) {
    console.log('error =>', error);
  }
}

async function delete_message() {
  try {
    const response = await API_DELETE_MESSAGE(messageId.value);
    console.log('delete_message response =>', response);
  }
  catch (error) {
    console.log('error =>', error);
  }
}

const replyMessage = ref('');
const replyMessageId = ref('');
async function send_reply_message() {
  const payload = {
    message_id: messageId.value,
    content: replyMessage.value,
  };
  try {
    const response = await API_POST_REPLY_MESSAGE(payload);
    console.log('send_reply_message response =>', response);
  }
  catch (error) {
    console.log('error =>', error);
  }
}

async function update_reply_message() {
  const payload = {
    content: replyMessage.value,
  };
  try {
    const response = await API_UPDATE_REPLY_MESSAGE(replyMessageId.value, payload);
    console.log('update_reply_message response =>', response);
  }
  catch (error) {
    console.log('error =>', error);
  }
}

async function delete_reply_message() {
  try {
    const response = await API_DELETE_REPLY_MESSAGE(replyMessageId.value);
    console.log('delete_reply_message response =>', response);
  }
  catch (error) {
    console.log('error =>', error);
  }
}
</script>

<template>
  <div class="flex p-8">
    <div class="flex-1 pr-4">
      <div class="register rounded-lg bg-gray-100 p-4 shadow-md">
        <div class="mb-2 flex items-center">
          <span class="mr-2">用戶名:</span>
          <div class="flex flex-1">
            <input
              v-model="registerData.name"
              type="text"
              class="w-full flex-grow border rounded-md p-2"
            >
          </div>
        </div>
        <div class="mb-2 flex items-center">
          <span class="mr-2">年齡:</span>
          <div class="flex flex-1">
            <input
              v-model.number="registerData.age"
              type="number"
              class="w-full border rounded-md p-2"
            >
          </div>
        </div>
        <div class="mb-2 flex items-center">
          <span class="mr-2">帳號:</span>
          <div class="flex flex-1">
            <input
              v-model="registerData.email"
              type="text"
              class="w-full border rounded-md p-2"
            >
          </div>
        </div>
        <div class="mb-2 flex items-center">
          <span class="mr-2">密碼:</span>
          <div class="flex flex-1">
            <input
              v-model="registerData.password"
              type="password"
              class="w-full border rounded-md p-2"
            >
          </div>
        </div>
        <button
          class="rounded-md bg-blue-500 p-2 text-white"
          @click.prevent="register"
        >
          註冊
        </button>
      </div>

      <div class="login rounded-lg bg-gray-100 p-4 shadow-md">
        <div class="mb-2 flex items-center">
          <span class="mr-2">帳號:</span>
          <div class="flex flex-1">
            <input
              v-model="loginData.email"
              type="text"
              class="w-full border rounded-md p-2"
            >
          </div>
        </div>
        <div class="mb-2 flex items-center">
          <span class="mr-2">密碼:</span>
          <div class="flex flex-1">
            <input
              v-model="loginData.password"
              type="password"
              class="w-full border rounded-md p-2"
            >
          </div>
        </div>
        <button
          class="rounded-md bg-blue-500 p-2 text-white"
          @click.prevent="login"
        >
          登入
        </button>
      </div>

      <div class="mb-4 p4">
        <button
          class="rounded-md bg-blue-500 p-2 text-white"
          @click.prevent="get_user_list"
        >
          取得使用者列表
        </button>
      </div>

      <div class="user rounded-lg bg-gray-100 p-4 shadow-md">
        <div class="mb-2 flex items-center">
          <span class="mr-2">當前使用者ID:</span>
          <div class="flex flex-1">
            <input
              v-model="loginId"
              type="text"
              class="w-full border rounded-md p-2"
            >
          </div>
        </div>
        <button
          class="rounded-md bg-blue-500 p-2 text-white"
          @click.prevent="get_user"
        >
          取得當前使用者資訊
        </button>
      </div>

      <div class="mb-4 p4">
        <button
          class="rounded-md bg-blue-500 p-2 text-white"
          @click.prevent="get_message_list"
        >
          取得所有留言列表
        </button>
      </div>

      <div class="mb-4">
        <div class="rounded-lg bg-gray-100 p-4 shadow-md">
          <div class="mb-2 flex items-center">
            <span class="mr-2">留言:</span>
            <span class="mr-2">留言ID:</span>
            <div class="flex flex-1">
              <input
                v-model="messageId"
                type="text"
                class="w-full border rounded-md p-2"
              >
            </div>
          </div>
          <div class="w-full flex">
            <textarea
              v-model="message"
              rows="6"
              class="w-full border rounded-md p-2"
            />
          </div>
          <div class="mt-2">
            <button
              class="mr-2 rounded-md bg-blue-500 p-2 text-white"
              @click.prevent="send_message"
            >
              發送留言
            </button>
            <button
              class="mr-2 rounded-md bg-blue-500 p-2 text-white"
              @click.prevent="update_message"
            >
              更新留言
            </button>
            <button
              class="rounded-md bg-blue-500 p-2 text-white"
              @click.prevent="delete_message"
            >
              刪除留言
            </button>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <div class="rounded-lg bg-gray-100 p-4 shadow-md">
          <div class="mb-2 flex items-center">
            <span class="mr-2">回覆:</span>
            <span class="mr-2">回覆ID:</span>
            <div class="flex flex-1">
              <input
                v-model="replyMessageId"
                type="text"
                class="w-full border rounded-md p-2"
              >
            </div>
          </div>
          <div class="w-full flex">
            <textarea
              v-model="replyMessage"
              rows="6"
              class="w-full border rounded-md p-2"
            />
          </div>
          <div class="mt-2">
            <button
              class="mr-2 rounded-md bg-blue-500 p-2 text-white"
              @click.prevent="send_reply_message"
            >
              發送回覆留言
            </button>
            <button
              class="mr-2 rounded-md bg-blue-500 p-2 text-white"
              @click.prevent="update_reply_message"
            >
              更新回覆留言
            </button>
            <button
              class="rounded-md bg-blue-500 p-2 text-white"
              @click.prevent="delete_reply_message"
            >
              刪除回覆留言
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 pr-4">
      <h1 class="mb-4 text-2xl font-bold">
        留言列表
      </h1>
      <!-- 留言列表内容 -->
    </div>
  </div>
</template>

<!-- <template>
  <div class="flex">
    <div class="flex-auto">
      <div class="register mb-16px">
        <div class="mb-8px">
          <span class="mr-8px">用戶名:</span>
          <input
            v-model="registerData.name"
            type="text"
          >
        </div>
        <div class="mb-8px">
          <span class="mr-8px">年齡:</span>
          <input
            v-model.number="registerData.age"
            type="number"
          >
        </div>
        <div class="mb-8px">
          <span class="mr-8px">帳號:</span>
          <input
            v-model="registerData.email"
            type="text"
          >
        </div>
        <div class="mb-8px">
          <span class="mr-8px">密碼:</span>
          <input
            v-model="registerData.password"
            type="text"
          >
        </div>
        <button @click.prevent="register">
          註冊
        </button>
      </div>

      <div class="login mb-16px">
        <div class="mb-8px">
          <span class="mr-8px">帳號:</span>
          <input
            v-model="loginData.email"
            type="text"
          >
        </div>
        <div class="mb-8px">
          <span class="mr-8px">密碼:</span>
          <input
            v-model="loginData.password"
            type="text"
          >
        </div>
        <button @click.prevent="login">
          登入
        </button>
      </div>

      <div class="mb-16px">
        <button @click.prevent="get_user_list">
          取得使用者列表
        </button>
      </div>

      <div class="user mb-16px">
        <div class="mb-8px">
          <span class="mr-8px">當前使用者ID:</span>
          <input
            v-model="loginId"
            type="text"
          >
        </div>
        <button @click.prevent="get_user">
          取得當前使用者資訊
        </button>
      </div>

      <div class="mb-16px">
        <button @click.prevent="get_message_list">
          取得所有留言列表
        </button>
      </div>

      <div class="mb-16px">
        <div class="mb-16px">
          <span>留言:</span>
          <span>留言ID:</span>
          <input
            v-model="messageId"
            type="text"
          >
          <div>
            <textarea
              id=""
              v-model="message"
              name=""
              cols="30"
              rows="10"
            />
          </div>
          <button
            class="mr-3"
            @click.prevent="send_message"
          >
            發送留言
          </button>

          <button
            class="mr-3"
            @click.prevent="update_message"
          >
            更新留言
          </button>

          <button
            class="mr-3"
            @click.prevent="delete_message"
          >
            刪除留言
          </button>
        </div>
      </div>

      <div class="mb-16px">
        <div class="mb-16px">
          <span>回覆:</span>
          <span>回覆ID:</span>
          <input
            v-model="replyMessageId"
            type="text"
          >
          <div>
            <textarea
              id=""
              v-model="replyMessage"
              name=""
              cols="30"
              rows="10"
            />
          </div>
          <button
            class="mr-3"
            @click.prevent="send_reply_message"
          >
            發送回覆留言
          </button>

          <button
            class="mr-3"
            @click.prevent="update_reply_message"
          >
            更新回覆留言
          </button>

          <button
            class="mr-3"
            @click.prevent="delete_reply_message"
          >
            刪除回覆留言
          </button>
        </div>
      </div>
    </div>
    <div class="flex-auto">
      <h1>留言列表</h1>
    </div>
  </div>
</template> -->

<style scoped></style>
