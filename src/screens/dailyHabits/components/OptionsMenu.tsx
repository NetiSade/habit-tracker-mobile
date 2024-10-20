import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { Menu } from "react-native-paper";

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
    <Menu
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
  );
};

export default OptionsMenu;
