/* Vuex: Vue에서 데이터(상태)를 관리하는 라이브러리로
모든 컴포넌트에 동일한 상태의 데이터를 공유하고 관리할 수 있다.

Vuex를 사용하는 이유: 
props, emit을 사용하면 컴포넌트간에 데이터 공유가 가능하지만, 
프로젝트의 규모가 커짐에 따라  컴포넌트가 많아지고 복잡해 질 수록 유지보수 하기 힘들고
가독성이 떨어질 수 있기 때문에 Vuex 상태관리를 통해서
공통적으로 데이터를 관리하고 공유하는 것이 더 효율적일 수 있다.

Vuex는 데이터를 저장하는 저장소라고도 불리지만
실제 데이터를 메모리에 저장해두는 것이기 때문에 브라우저를 종료하거나
새로고침하면 데이터는 초기화된다.
새로고침 시에도 데이터를 유지하려면 vuex-peristedstate (vuex-데이터영속화)
state-localstorage 동기화 라이브러리라고도 한다.) 가 필요

설치
npm install vuex@3 */

// vuex 버전 안맞아서 개고생.. npm install vuex 하지말고
// npm install vuex@3로 vuex 3.0 버전 설치
// 그냥 install 하면 vuex4.0 버전 설치되는데 vuex4는 vue2랑 호환이 안된다고 한다.
// https://stackoverflow.com/questions/48822662/warning-in-node-modules-vuex-dist-vuex-esm-js
export default {
  // namespaced true를 선언해주면 해당모듈(test)을 독립적으로 사용할 수 있다.
  // 이 모듈을 사용할 파일에서 mapGGers에 모듈 네임을 선언해주고 getter로 필요한 데이터를 get할 수 있다.
  namespaced: true,

  // 데이터 영역
  state: {
    loingUserInfo: {},
  },

  // getter는 해당 모듈의 데이터를 여러 컴포넌트에서 가져다 쓸 시 데이터에 대한 행위를 여러번 반복 해야 하는데
  // 스토어에 해당 행위를 선언해두고 각 컴포넌트들에서 호출해서 사용하는 것이 비효율적인 코드를 줄일 수 있다.
  getters: {
    // 첫 번째 전달 인자로 상태(state)를 받음, 두 번째 인자로 다른 getter를 받을 수 있다.
    loingUserInfo: (state) => {
      return state.loingUserInfo;
    },
    // loingUserInfo(state) {
    //   return [state.loingUserInfo];
    // },
  },
  // actions = 메소드
  // 데이터 상태 변경 시 명시적으로 commit을 사용한다.
  // getter에서 직접 변경해도 되지만 어느 컴포넌트에서 데이터 변경이 일어났는지 추적이 어렵기 때문에
  // Actions 는 비동기적 로직을 정의할 수 있다.
  actions: {
    // userInfo: ({ commit }, data) => {
    //   console.log(data);
    //   commit("userInfo", data);
    // },
    // 비동기적 사용 가능
    // 3초 후 로그인 처리
    userInfo({ commit }, data) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("userInfo", data);
          resolve();
        }, 3000);
      });
    },
  },

  // state에 접근 할 수 있고 값을 변경할 수 있으며 getter와의 차이점은
  // 여러 컴포넌트에서 state에 접근하여 값을 마음대로 변경하면 해당 state값이 어느 시점에 어느 컴포넌트에서
  // 변경이 일어난 건지 추적이 어려움.
  // 되도록 getter는 state에 접근하는 용도로 사용하고 state의 값을 변경해야 한다면 mutations을 사용
  // setter의 개념
  mutations: {
    userInfo: (state, userInfo) => {
      console.log(state, "state");
      console.log(userInfo, "userInfo");
      state.loingUserInfo = { ...userInfo };
    },
  },
};
