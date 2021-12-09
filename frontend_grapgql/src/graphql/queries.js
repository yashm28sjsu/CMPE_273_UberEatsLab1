import { gql } from 'apollo-boost';

const userLogin = gql`
query ($user: UserLogin) {
  userlogin(user: $user) {
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

const restaurantLogin = gql`
query($restaurant: RestaurantLogin) {
  restaurantLogin(user: $restaurant) {
    restaurant {
      name
      email
      address
    }
    token
    error
  }
`;

const getAllRestaurants = gql`
query {
  getAllRestaurants {
    restaurants {
      name
      address
    }
  }
}
`;

const getUserOrders = gql`
query($userId: String) {
  getUserOrders(userId: $userId) {
    orders {
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
  }
}
`;

const getRestaurantOrders = gql`
query($restaurantId: String) {
  getUserOrders(restaurantId: $restaurantId) {
    orders {
      user {
        firstname
        lastname
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
  }
}
`;

const getDishes = gql`
query($restaurantId: String) {
  getDishes($restaurantId: restaurantId) {
    dishes {
      name
      ingredients
      price
      type
    }
  }
}
`;

const getAddresses = gql`
query($userId: String) {
  getAddresses($userId: userId) {
    addresses {
      name
      address
    }
  }
}
`;

module.exports = {
  userLogin,
  restaurantLogin,
  getAllRestaurants,
  getUserOrders,
  getRestaurantOrders,
  getDishes,
  getAddresses,
};
