import React, { useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectProgress,
  selectSettings,
  updateSettings,
} from "../game/game.slice";
import SettingsModal from "./settings/SettingsModal";
import { Settings } from "../game/game.interface";

//TODO use css modules

function Header() {
  return (
    <div className="header">
      <Logo />
      <ScoreDisplay />
      <Icons />
    </div>
  );
}

function Logo() {
  //TODO insert logo
  return (
    <div className="logo">
      <span>mem</span>
      <span className="dot">•</span>
      <span>mission</span>
    </div>
  );
}

function ScoreDisplay() {
  const { score, elapsedTime, mistakes } = useAppSelector(selectProgress);
  const { timer } = useAppSelector(selectSettings);

  const remainingTime = Math.round(timer - elapsedTime);
  return (
    <div className="score">
      <span className="score-number">{remainingTime}</span>
      <div className="matches">
        <span>{score} matches</span>
        <span>{mistakes} mistakes</span>
      </div>
    </div>
  );
}

function Icons() {
  const settingsState = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  const [isModalOpen, setModalOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(settingsState);

  //TODO reset the game
  const handleSave = () => {
    console.log("Settings saved!", settings);
    dispatch(updateSettings(settings));
  };

  return (
    <div className="icons">
      <FontAwesomeIcon
        icon={faCog}
        className="icon settings"
        onClick={() => setModalOpen(true)}
      />
      <FontAwesomeIcon icon={faSyncAlt} className="icon refresh" />
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

export default Header;
