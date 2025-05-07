<template>
  <div class="signup">
    <h2>회원가입</h2>
    <form @submit.prevent="handleSignup">
      <input type="text" v-model="name" placeholder="이름 입력" required />
      <input type="email" v-model="id" placeholder="이메일 입력" required />
      <input type="password" v-model="password" placeholder="비밀번호 입력" required />
      <button type="submit">가입하기</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Signup',
  data() {
    return {
      name: '',
      id: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async handleSignup() {
      // 유효성 검사
      if (!this.id.includes('@') || !this.id.includes('.com')) {
        this.message = '올바른 이메일 형식이 아닙니다.';
        return;
      }
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(this.password)) {
        this.message = '비밀번호는 영문과 숫자를 포함한 8자리 이상이어야 합니다.';
        return;
      }

      try {
        const res = await axios.post('http://localhost:5000/signup', {
          name: this.name,
          id: this.id,
          password: this.password
        });
        this.message = res.data.message;
      } catch (err) {
        this.message = err.response?.data?.message || '회원가입 실패';
      }
    }
  }
};
</script>

<style scoped>
.signup {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
