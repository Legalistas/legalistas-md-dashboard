import { BiSolidChat } from "react-icons/bi";
import {
  FaCalendar,
  FaChartBar,
  FaCloud,
  FaCogs,
  FaList,
  FaRoute,
  FaTasks,
} from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { GoLaw } from "react-icons/go";
import { HiOutlineCalculator } from "react-icons/hi";
import { IoDocuments } from "react-icons/io5";
import {
  MdForum,
  MdOutlineAttachMoney,
  MdOutlineHandshake,
} from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { SiSimpleanalytics } from "react-icons/si";
import { SlPieChart } from "react-icons/sl";
import { TbCash, TbLayoutKanban } from "react-icons/tb";

const links = [
  { key: "/", href: "/dashboard", text: "Inicio", icon: RxDashboard },
  { key: "", href: "title", text: "VENTAS", icon: "" },
  { key: "crm", href: "/crm", text: "Embudo", icon: TbLayoutKanban },
  { key: "customers", href: "/customers", text: "Clientes", icon: FiUsers },
  { key: "", href: "title", text: "LEGALES", icon: "" },
  { key: "causes", href: "/causes", text: "Causas", icon: GoLaw },
  {
    key: "causes",
    href: "/causes/calculators",
    text: "Calculadoras",
    icon: HiOutlineCalculator,
  },
  {
    key: "causes",
    href: "/causes/consultation",
    text: "Consultas",
    icon: BiSolidChat,
  },
  {
    key: "causes",
    href: "/causes/documents",
    text: "Documentos",
    icon: IoDocuments,
  },
  { key: "", href: "title", text: "CONTABLE", icon: "" },
  {
    key: "agreements",
    href: "/agreements",
    text: "Acuerdos",
    icon: MdOutlineHandshake,
  },
  { key: "cash", href: "/cash", text: "Caja Principal", icon: TbCash },
  { key: "", href: "title", text: "APLICACIONES", icon: "" },
  { key: "cloud", href: "/cloud", text: "Nube", icon: FaCloud },
  { key: "calendar", href: "/calendar", text: "Calendario", icon: FaCalendar },
  { key: "tasks", href: "/tm", text: "Tareas", icon: FaTasks },
  { key: "routes", href: "/routes", text: "Ruta", icon: FaRoute },
  { key: "chat", href: "/chat", text: "Chat", icon: MdForum },
  { key: "", href: "title", text: "ESTADISTICAS", icon: "" },
  {
    key: "statistic",
    href: "/statistic/sales",
    text: "Ventas",
    icon: FaChartBar,
  },
  {
    key: "statistic",
    href: "/statistic/legals",
    text: "Legales",
    icon: SlPieChart,
  },
  {
    key: "statistic",
    href: "/statistic/marketing",
    text: "Marketing",
    icon: SiSimpleanalytics,
  },
  {
    key: "statistic",
    href: "/statistic/finances",
    text: "Contable",
    icon: MdOutlineAttachMoney,
  },
  { key: "", href: "title", text: "ADMINISTRACIÓN", icon: "" },
  { key: "users", href: "/users", text: "Miembros", icon: FiUsers },
  {
    key: "settings",
    href: "#",
    text: "Configuración",
    icon: FaCogs,
    isCollapse: true,
    collapse: [
      {
        href: "/profile",
        text: "Mi Perfil",
      },
      {
        href: "/settings",
        text: "Ajustes",
      },
    ],
  },
];

export default links;
