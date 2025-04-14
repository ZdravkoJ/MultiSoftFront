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
  User2,
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
          href: "/dashboard/default",
          title: t("Pocetna"),
          icon: Heart,
        },
        {
          href: "/dashboard/control-panel",
          title: t("ControlPanel"),
          icon: User2,
        },
        {
          href: "/dashboard/admin-panel",
          title: t("SuperAdmin"),
          icon: Users,
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
