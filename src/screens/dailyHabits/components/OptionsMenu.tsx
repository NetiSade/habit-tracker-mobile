import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { Platform } from "react-native";
import { IconButton, Menu } from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface OptionsMenuProps {
  toggleEditMode: () => void;
  onLogoutPress: () => void;
  isEditMode: boolean;
}

const OptionsMenu = ({
  toggleEditMode,
  onLogoutPress,
  isEditMode,
}: OptionsMenuProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const statusBarHeight = Platform.OS === "android" ? insets.top : 0; // workaround for fix menu overflow on android

  const openMenu = () => setIsVisible(true);
  const closeMenu = () => setIsVisible(false);

  const menuIcon = isEditMode ? "check" : "dots-vertical";

  const handleIconMenuPress = () => {
    if (isEditMode) {
      toggleEditMode();
    } else {
      openMenu();
    }
  };

  return (
    <ThemedView>
      <Menu
        statusBarHeight={statusBarHeight}
        visible={isVisible}
        onDismiss={closeMenu}
        anchor={<IconButton icon={menuIcon} onPress={handleIconMenuPress} />}
      >
        <Menu.Item
          onPress={() => {
            toggleEditMode();
            closeMenu();
          }}
          title="Edit"
          leadingIcon="pencil"
        />
        <Menu.Item
          onPress={() => {
            onLogoutPress();
            closeMenu();
          }}
          title="Logout"
          leadingIcon="logout"
        />
      </Menu>
    </ThemedView>
  );
};

export default OptionsMenu;
