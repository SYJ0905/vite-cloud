<script setup lang="ts">
import { LOGIN_TOKEN } from '@/plugins/cookies';
import Register from '@/components/messageboard/Register.vue';
import Login from '@/components/messageboard/Login.vue';
import {
  API_DELETE_MESSAGE,
  API_DELETE_REPLY_MESSAGE,
  API_GET_CURRENT_USER,
  API_GET_MESSAGES,
  API_GET_USERLIST,
  API_POST_LOGIN,
  API_POST_MESSAGE,
  API_POST_REGISTER,
  API_POST_REPLY_MESSAGE,
  API_UPDATE_MESSAGE,
  API_UPDATE_REPLY_MESSAGE,
} from '@/plugins/api';

const authType = ref('register');

const registerData = ref({
  username: '',
  age: 0,
  email: '',
  password: '',
});
async function register() {
  const payload = registerData.value;
  try {
    const response = await API_POST_REGISTER(payload);
    console.log('註冊 =>', response);
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
  const payload = new FormData();
  payload.append('username', loginData.value.email);
  payload.append('password', loginData.value.password);
  try {
    const response = await API_POST_LOGIN(payload);
    console.log('登入 response =>', response);
    if (response.status === 200)
      await LOGIN_TOKEN.set(response.data.access_token);
    await get_user();
  }
  catch (error) {
    console.log('error =>', error);
  }
}

const currentUserData = ref<{
  user_id: string
  username: string
  age: 0
  email: string
}>({
  user_id: '',
  username: '',
  age: 0,
  email: '',
});
async function get_user() {
  try {
    const response = await API_GET_CURRENT_USER();
    console.log('當前使用者 response =>', response);
    currentUserData.value = response.data.data;
  }
  catch (error) {
    console.log('error =>', error);
  }
}
watch(
  () => authType.value,
  (newValue) => {
    if (newValue === 'login') {
      currentUserData.value = {
        user_id: '',
        username: '',
        age: 0,
        email: '',
      };
    }
    if (newValue === 'register') {
      registerData.value = {
        username: '',
        age: 0,
        email: '',
        password: '',
      };
    }
  },
);

const page = ref(1);
const page_size = ref(20);
const page_rowcount = ref(0);
const user_list = ref([]);
async function get_user_list() {
  const payload = {
    page: page.value,
    page_size: page_size.value,
  };
  try {
    const response = await API_GET_USERLIST(payload);
    console.log('使用者列表 response =>', response);
    user_list.value = response.data.data.items;
    page_rowcount.value = response.data.data.rowcount;
  }
  catch (error) {
    console.log('error =>', error);
  }
}
watch(
  () => page.value,
  async () => {
    await get_user_list();
  },
);

const messageList = ref<{
  message_id: string
  content: string
  create_account: string
  create_at: string
  replies: {
    reply_id: string
    content: string
    create_account: string
    create_at: string
    message_id: string }[]
}[]>([]);
async function get_message_list() {
  try {
    const response = await API_GET_MESSAGES();
    console.log('留言列表 response =>', response);
    messageList.value = response.data.data;
  }
  catch (error) {
    console.log('error =>', error);
  }
}

const messageId = ref('');
const replyMessageId = ref('');
const inputContent = ref('');
const target_user_id = ref('');

async function send_message() {
  const payload = {
    content: inputContent.value,
  };
  try {
    const response = await API_POST_MESSAGE(payload);
    console.log('建立留言 response =>', response);
  }
  catch (error) {
    console.log('error =>', error);
  }
}

async function update_message() {
  const payload = {
    content: inputContent.value,
  };
  try {
    const response = await API_UPDATE_MESSAGE(messageId.value, payload);
    console.log('更新留言 response =>', response);
  }
  catch (error) {
    console.log('error =>', error);
  }
}

async function delete_message() {
  try {
    const response = await API_DELETE_MESSAGE(messageId.value);
    console.log('刪除留言 response =>', response);
    await get_message_list();
  }
  catch (error) {
    console.log('error =>', error);
  }
}

async function send_reply_message() {
  const payload = {
    message_id: messageId.value,
    content: inputContent.value,
  };
  try {
    const response = await API_POST_REPLY_MESSAGE(payload);
    console.log('建立回覆 response =>', response);
  }
  catch (error) {
    console.log('error =>', error);
  }
}

async function update_reply_message() {
  const payload = {
    content: inputContent.value,
  };
  try {
    const response = await API_UPDATE_REPLY_MESSAGE(replyMessageId.value, payload);
    console.log('更新回覆 response =>', response);
  }
  catch (error) {
    console.log('error =>', error);
  }
}

async function delete_reply_message() {
  try {
    const response = await API_DELETE_REPLY_MESSAGE(replyMessageId.value);
    console.log('刪除回覆 response =>', response);
    await get_message_list();
  }
  catch (error) {
    console.log('error =>', error);
  }
}

async function send_content() {
  if (messageId.value === ''
    && replyMessageId.value === ''
    && target_user_id.value === ''
  )
    await send_message();

  if (messageId.value !== ''
    && replyMessageId.value === ''
    && target_user_id.value === currentUserData.value.user_id
  )
    await update_message();

  if (messageId.value !== ''
    && replyMessageId.value === ''
    && target_user_id.value !== currentUserData.value.user_id
  )
    await send_reply_message();

  if (messageId.value === ''
    && replyMessageId.value !== ''
    && target_user_id.value === ''
  )
    await update_reply_message();

  await get_message_list();
}

const columns = ref([
  { name: 'user_id', label: 'user_id', field: 'user_id' },
  { name: 'username', label: 'username', field: 'username' },
  { name: 'age', label: 'age', field: 'age' },
  { name: 'email', label: 'email', field: 'email' },
]);
</script>

<template>
  <div class="page-container">
    <div class="left-section">
      <div class="left-section">
        <q-btn-toggle
          v-model="authType"
          class="mb-4"
          toggle-color="primary"
          :options="[
            { label: '註冊', value: 'register' },
            { label: '登入', value: 'login' },
          ]"
        />

        <div
          v-if="currentUserData.user_id"
          class="user-info"
        >
          <div class="info-item">
            <span class="info-label">用戶編號:</span>
            <span class="info-value">{{ currentUserData.user_id }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">信箱:</span>
            <span class="info-value">{{ currentUserData.email }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">用戶名稱:</span>
            <span class="info-value">{{ currentUserData.username }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">年齡:</span>
            <span class="info-value">{{ currentUserData.age }}</span>
          </div>
        </div>

        <q-btn
          v-if="currentUserData.user_id === ''"
          color="blue"
          label="取得當前使用者資訊"
          @click="get_user"
        />

        <Register
          v-if="authType === 'register' && currentUserData.user_id === ''"
          v-model:registerData="registerData"
          @handle-register="register"
        />
        <Login
          v-if="authType === 'login' && currentUserData.user_id === ''"
          v-model:loginData="loginData"
          @handle-login="login"
        />

        <template v-if="currentUserData.user_id">
          <div class="q-mb-md q-pa-md">
            <q-btn
              color="blue"
              rounded
              class="text-white"
              @click="get_user_list"
            >
              取得使用者列表
            </q-btn>
          </div>
          <div class="q-mb-md q-pa-md">
            <q-btn
              color="blue"
              rounded
              class="text-white"
              @click="get_message_list"
            >
              取得所有留言列表
            </q-btn>
          </div>

          <div class="card-session q-pa-md q-mb-md rounded-lg bg-gray-100 shadow-md">
            <div class="mb-2 flex items-center">
              <span class="mr-2">留言ID:</span>
              <q-input
                v-model="messageId"
                filled
                class="flex-grow"
              />
            </div>
            <div class="mb-2 flex items-center">
              <span class="mr-2">留言建立者ID:</span>
              <q-input
                v-model="target_user_id"
                filled
                class="flex-grow"
              />
            </div>
            <div class="mb-2 flex items-center">
              <q-btn
                color="blue"
                rounded
                class="text-white"
                @click="delete_message"
              >
                刪除留言
              </q-btn>
            </div>
          </div>

          <div class="card-session q-pa-md q-mb-md rounded-lg bg-gray-100 shadow-md">
            <div class="mb-2 flex items-center">
              <span class="mr-2">回覆ID:</span>
              <q-input
                v-model="replyMessageId"
                filled
                class="flex-grow"
              />
            </div>
            <div class="mb-2 flex items-center">
              <q-btn
                color="blue"
                rounded
                class="text-white"
                @click="delete_reply_message"
              >
                刪除回覆
              </q-btn>
            </div>
          </div>

          <div class="card-session q-pa-md q-mb-md rounded-lg bg-gray-100 shadow-md">
            <div class="mb-2 flex items-center">
              <span class="mr-2">內容:</span>
              <q-input
                v-model="inputContent"
                filled
                textarea
                rows="6"
              />
              <q-btn
                color="blue"
                rounded
                class="text-white"
                @click="send_content"
              >
                送出
              </q-btn>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="right-section">
      <div class="page-title">
        留言列表
      </div>
      <div class="message-list">
        <div
          v-for="message in messageList"
          :key="message.message_id"
          class="message-card"
        >
          <div class="message-content">
            {{ message.content }}
          </div>
          <div class="message-info">
            <div class="message-id">
              留言編號: {{ message.message_id }}
            </div>
            <div class="creator">
              建立者: {{ message.create_account }}
            </div>
          </div>
          <div class="replies">
            <div
              v-for="reply in message.replies"
              :key="reply.reply_id"
              class="reply-card"
            >
              <div class="reply-content">
                {{ reply.content }}
              </div>
              <div class="reply-info">
                <div class="reply-id">
                  回覆編號: {{ reply.reply_id }}
                </div>
                <div class="creator">
                  回覆者: {{ reply.create_account }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="page-container">
    <div class="q-pa-md">
      <q-table
        title="使用者列表"
        :rows="user_list"
        :columns="columns"
        row-key="user_id"
        flat
        bordered
      />
      <q-pagination
        v-model="page"
        :min="1"
        :max="Math.ceil(page_rowcount / page_size)"
        input
        dense
        @input="get_user_list"
      />
    </div>
  </div>
</template>

<style lang="scss">
.page-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;

  .left-section {
    flex: 1;
    padding-right: 20px;

    .register,
    .login,
    .user,
    .card-session {
      margin-bottom: 20px;
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgb(0 0 0 / 10%);

      .q-input {
        width: 100%;
        margin-bottom: 10px;
      }

      .q-btn {
        margin-top: 10px;
        padding: 10px 20px;
        color: white;
        background-color: #007bff;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          background-color: #0056b3;
        }
      }
    }

    .q-btn {
      width: 100%;
      text-align: center;
    }
  }

  .right-section {
    flex: 1;
    padding-left: 20px;

    .page-title {
      margin-bottom: 20px;
      font-weight: bold;
      font-size: 24px;
    }
  }
}

.message-list {
  display: flex;
  flex-direction: column;
}

.message-card {
  margin: 10px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.message-card:hover {
  box-shadow: 0 4px 8px rgb(0 0 0 / 20%);
  transform: translateY(-4px);
}

.message-content {
  margin-bottom: 12px;
  font-size: 16px;
}

.message-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #888;
  font-size: 12px;
}

.creator {
  margin-right: 8px;
}

.replies {
  margin-top: 12px;
}

.reply-card {
  margin-top: 8px;
  padding: 12px;
  background-color: #f7f7f7;
  border-radius: 6px;
}

.reply-content {
  margin-bottom: 8px;
  font-size: 14px;
}

.reply-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #888;
  font-size: 12px;
}

.message-id,
.reply-id {
  font-weight: bold;
}

.user-info {
  margin-top: 20px;
  padding: 16px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
}

.info-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.info-label {
  color: #333;
  font-weight: bold;
}

.info-value {
  color: #555;
}
</style>
