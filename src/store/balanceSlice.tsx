import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  verticalNav: {isTrue: false},
  tables: {tables: []},
  user: {username: null, roles: null, isAuth: false},
  orderInfo: {
    foods: [{food_name: null, price: null, quantity: 0}],
    table: {name: null, status: null},
    total: 0,
  },
};
export const balanceSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setVerticalNav: state => {
      state.verticalNav.isTrue = !state.verticalNav.isTrue;
    },
    setTables: (state, action) => {
      state.tables.tables = action.payload.tables;
    },
    setOrderFood: (state, action) => {
      if (state.orderInfo.foods[0].food_name != null) {
        let isExisted = state.orderInfo.foods.find(
          (item: any, index: number) =>
            item.food_name == action.payload.foods[0].food_name,
        );
        if (isExisted === undefined) {
          state.orderInfo.foods = [
            ...state.orderInfo.foods,
            {
              food_name: action.payload.foods[0].food_name,
              price: action.payload.foods[0].price,
              quantity: 1,
            },
          ];
        } else {
          state.orderInfo.foods.find((item: any, index: number) =>
            item.food_name == action.payload.foods[0].food_name
              ? (item.quantity += 1)
              : '',
          );
        }
      } else {
        state.orderInfo.foods = action.payload.foods;
      }
    },
    setFoodQuantity: (state, action) => {
      let isExisted = state.orderInfo.foods.find(
        (item: any, index: number) =>
          item.food_name == action.payload.foods[0].food_name,
      );
      if (isExisted != undefined) {
        action.payload.foods[0].quantity == 0
          ? state.orderInfo.foods.find((item: any, index: number) =>
              item.food_name == action.payload.foods[0].food_name
                ? state.orderInfo.foods.splice(index, 1)
                : '',
            ) && state.orderInfo.foods.length == 0
            ? state.orderInfo.foods.push({
                food_name: null,
                price: null,
                quantity: 0,
              })
            : ''
          : state.orderInfo.foods.find((item: any, index: number) =>
              item.food_name == action.payload.foods[0].food_name &&
              action.payload.foods[0].quantity > 0
                ? (item.quantity = action.payload.foods[0].quantity)
                : '',
            );
      }
    },
    setOrderTable: (state, action) => {
      state.orderInfo.table.name = action.payload.table.name;
      state.orderInfo.table.status = action.payload.table.status;
      action.payload.table.name == null ? (state.tables.tables = []) : '';
    },
    setOrderTotal: (state, action) => {
      if (action.payload.add == true) {
        state.orderInfo.total = state.orderInfo.total + parseInt(action.payload.total);
      } else if (
        action.payload.sub == true &&
        state.orderInfo.total - parseInt(action.payload.total) >= 0
      ) {
        state.orderInfo.total = state.orderInfo.total - parseInt(action.payload.total);
      }
    },
    addOrder: state => {
      state.tables.tables = [];
      state.orderInfo = {
        foods: [{food_name: null, price: null, quantity: 0}],
        table: {name: null, status: null},
        total: 0,
      };
    },
    setSignin: (state, action) => {
      state.user.username = action.payload.username;
      state.user.roles = action.payload.roles;
      state.user.isAuth = action.payload.isAuth;
    },
    setSignout: state => {
      state.user.username = null;
      state.user.roles = null;
      state.user.isAuth = false;
    },
  },
});
export const {
  setSignin,
  setSignout,
  setOrderFood,
  addOrder,
  setOrderTable,
  setFoodQuantity,
  setOrderTotal,
  setTables,
  setVerticalNav,
} = balanceSlice.actions;
export const selectIsAuth = (state: any) => state.userAuth.user.isAuth;
export const selectUsername = (state: any) => state.userAuth.user.username;
export const selectRoles = (state: any) => state.userAuth.user.roles;
export const selectOrderInfo = (state: any) => state.userAuth.orderInfo;
export const selectOrderTotal = (state: any) => state.userAuth.orderInfo.total;
export const selectTables = (state: any) => state.userAuth.tables.tables;
export const selectVerticalNav = (state: any) =>
  state.userAuth.verticalNav.isTrue;
export const selectorOrderQuantity = (state: any) =>
  state.userAuth.orderInfo.foods[0].food_name != null
    ? state.userAuth.orderInfo.foods.length
    : 0;

export default balanceSlice.reducer;
