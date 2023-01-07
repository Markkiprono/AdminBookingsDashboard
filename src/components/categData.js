import { FaChalkboardTeacher } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { BsListCheck } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
export const categData = [
  {
    id: 2,
    name: "Schedule",
    icon: <SlCalender />,
    to: "/",
  },
  {
    id: 3,
    name: "Orders",
    icon: <BsListCheck />,
    to: "/Orders",
  },
  {
    id: 4,
    name: "Payment History",
    icon: <MdAttachMoney />,
    to: "/PaymentHistory",
  },
  {
    id: 5,
    name: "Users",
    icon: <FiUsers />,
    to: "/Users",
  },
];
