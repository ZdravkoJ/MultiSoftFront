import { SidebarItemsType } from "../../types/sidebar";
import { useTranslation } from "react-i18next";

import {
  Bell,
  BookOpen,
  Calendar,
  CheckSquare,
  Grid,
  Heart,
  Layout,
  List,
  PieChart,
  Sliders,
  MapPin,
  Users,
  Share,
  Files,
  Mail,
  Trello,
  ShoppingBag,
  LayoutTemplate,
} from "lucide-react";

const useDashBoardItems = () => {
  //make me a function that returns an array of objects like in file dashbaordItems.ts
  //with modification to make it as compoenent so i can use react hooks in it
  const { t } = useTranslation();

  const navigationSection = [
    {
      href: "/dashboard",
      icon: Sliders,
      title: t("Transactions"),
      badge: "5",
      children: [
        {
          href: "/dashboard/default",
          title: t("AppSettingZ"),
        },
        {
          href: "/dashboard/analytics",
          title: t("Analytics"),
        },
        {
          href: "/dashboard/saas",
          title: t("SaaS"),
        },
        {
          href: "/dashboard/crypto",
          title: t("Crypto"),
        },
      ],
    },
  ];

  const appsSection: SidebarItemsType[] = [
    {
      href: "/chat",
      icon: List,
      title: t("Chat"),
    },
    {
      href: "/file-manager",
      icon: Files,
      title: t("FileManager"),
    },
    {
      href: "/calendar",
      icon: Calendar,
      title: t("Calendar"),
    },
  ];

  return [
    {
      title: t("Navigation"),
      pages: navigationSection,
    },
    {
      title: t("Apps"),
      pages: appsSection,
    },
  ];
};

export default useDashBoardItems;
