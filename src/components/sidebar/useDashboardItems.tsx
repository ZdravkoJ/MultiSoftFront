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

const useDashboardItems = (): {
  title: string;
  pages: SidebarItemsType[];
}[] => {
  const { t } = useTranslation();

  const navigationSection: SidebarItemsType[] = [
    {
      href: "/dashboard",
      icon: Sliders,
      title: t("Transactions"),
      badge: "",
      children: [
        {
          href: "/dashboard/control-panel",
          title: t("ControlPanel"),
          icon: Users,
        },
        {
          href: "/dashboard/default",
          title: t("AppSettings"),
          icon: Heart,
        },
        {
          href: "/dashboard/analytics",
          title: t("Analytics"),
          icon: PieChart,
        },
        {
          href: "/dashboard/saas",
          title: t("SaaS"),
          icon: Layout,
        },
        {
          href: "/dashboard/crypto",
          title: t("Crypto"),
          icon: Grid,
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

export default useDashboardItems;
