import { gql } from 'apollo-boost';

const createUser = gql`
mutation ($user: UserInput) {
  createUser(user: $user) {
    user {
      firstname
      lastname
      email
    }
    token
    error
  }
}
`;

const updateUser = gql`
mutation($user: UserInput) {
  updateUser(user: $user) {
    user {
      firstname
      lastname
      email
    }
    error
  }
}
`;

const createRestaurant = gql`
mutation($restaurant: RestaurantInput) {
  createRestaurant(user: $restaurant) {
    restaurant {
      name
      email
      address
    }
    token
    error
  }
`;

const updateRestaurant = gql`
mutation($restaurant: RestaurantInput) {
  updateRestaurant(user: $restaurant) {
    restaurant {
      name
      email
      address
    }
    error
  }
`;

const createOrder = gql`
mutation($order: OrderInput) {
  createOrder {
    order {
      restaurant {
        name
      }
      totalcost
      instructions
      status
      type
      lineitems {
        dish {
          name
        }
        quantity
        cost
      }
    }
    error
  }
}
`;

const updateOrderStatus = gql`
mutation($order: OrderStatusInput) {
  updateOrderStatus(order: $order) {
    order {
      restaurant {
        name
      }
      totalcost
      instructions
      status
      type
      lineitems {
        dish {
          name
        }
        quantity
        cost
      }
    }
    error
  }
}
`;

const createDish = gql`
mutation($dish: DishInput) {
  createDish(dish: $dish) {
    dish {
      name
      ingredients
      price
      type
    }
    error
  }
}
`;

const updateDish = gql`
mutation($dish: DishInput) {
  updateDish(dish: $dish) {
    dish {
      name
      ingredients
      price
      type
    }
    error
  }
}
`;

const createAddress = gql`
mutation($address: AddressInput) {
  createAddress($address: AddressInput) {
    address {
      name
      address
    }
    error
  }
}
`;

const updateAddress = gql`
mutation($address: AddressInput) {
  updateAddress($address: AddressInput) {
    address {
      name
      address
    }
    error
  }
}
`;

module.exports = {
  createUser,
  updateUser,
  createRestaurant,
  updateRestaurant,
  createOrder,
  updateOrderStatus,
  createDish,
  updateDish,
  createAddress,
  updateAddress,
};
