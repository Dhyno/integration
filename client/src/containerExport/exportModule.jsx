import TopingRender from '../components/atomic/detailProduct/TopingRender'
import OrderList from '../components/atomic/landing/OrderList';
import UserTotalChartRender from "../components/atomic/userChart/UserTotalChartRender";
import FormUserChart from "../components/atomic/userChart/FormUserChart";
import TotalPrice from "../components/atomic/userChart/TotalPrice";
import Profile from "../components/atomic/userProfile/Profile";
import Transaction from "../components/atomic/userProfile/Transaction"
import PopData from '../components/header/PopData';

import { topingData } from '../data/orderDataDumies/topping';
import { productList } from '../data/orderDataDumies/productList';
import { userChartOrder } from "../data/orderDataDumies/userChartOrder";

import doneStatus from "../assets/icons/done-status.svg";
import cancelStatus from "../assets/icons/cancel-status.svg";
import productHero from '../assets/images/largeImages/product-hero.svg';
import { userImages } from "../components/atomic/getAllImages/GetImages";
import { landingImages } from '../components/atomic/getAllImages/GetImages';

export {
    doneStatus,cancelStatus,userImages,productHero,landingImages,topingData,productList,userChartOrder,
    TopingRender,OrderList,UserTotalChartRender,FormUserChart,TotalPrice,Profile,Transaction,PopData
}