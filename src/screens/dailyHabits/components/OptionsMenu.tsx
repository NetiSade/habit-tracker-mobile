import { useState } from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { Menu } from "react-native-paper";

interface OptionsMenuProps {
  onEditPress: () => void;
  onLogoutPress: () => void;
}

const OptionsMenu = ({ onEditPress, onLogoutPress }: OptionsMenuProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const openMenu = () => setIsVisible(true);
  const closeMenu = () => setIsVisible(false);

  return (
    <View>
      <Menu
        visible={isVisible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
      >
        <Menu.Item
          onPress={() => {
            onEditPress();
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
    </View>
  );
};

export default OptionsMenu;
