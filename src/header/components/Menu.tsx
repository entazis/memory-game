import React, { useCallback, useState } from "react";
import styles from "../Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  resetProgress,
  selectSettings,
  updateSettings,
} from "../../game/game.slice";
import { Settings } from "../../game/game.interface";
import SettingsModal from "./settings/SettingsModal";

//TODO add login/ logout function
//TODO add "save game" function

export default function Menu() {
  const settingsState = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  const [isModalOpen, setModalOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(settingsState);

  const handleSave = useCallback(() => {
    console.log("Settings saved!", settings);
    dispatch(updateSettings(settings));
    dispatch(resetProgress());
  }, [settings, dispatch]);

  const handleReset = useCallback(() => {
    console.log("Game reset!");
    dispatch(resetProgress());
  }, [dispatch]);

  //TODO use clickable mouse icon on hover

  return (
    <div className={styles.icons}>
      <FontAwesomeIcon
        icon={faCog}
        className="icon settings"
        onClick={() => setModalOpen(true)}
        aria-label="settings"
        data-testid="settings-icon"
      />
      <FontAwesomeIcon
        icon={faSyncAlt}
        className="icon refresh"
        onClick={handleReset}
        aria-label="refresh"
        data-testid="refresh-icon"
      />
      <SettingsModal
        settings={settings}
        setSettings={setSettings}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
