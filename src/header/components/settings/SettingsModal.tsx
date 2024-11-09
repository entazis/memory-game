import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./SettingsModal.css";
import { Settings } from "../../../game/game.interface";

interface GameSettingsModalProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

//TODO use css modules

const GameSettingsModal = ({
  settings,
  setSettings,
  isOpen,
  onClose,
  onSave,
}: GameSettingsModalProps) => {
  return isOpen ? (
    <div className="modal-overlay" aria-label="settings-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Game settings</h2>
          <button onClick={onClose} className="close-button" aria-label="close">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="modal-body">
          <label>
            Number of pair of cards
            <input
              type="number"
              value={settings.cardPairsCount}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  cardPairsCount: parseInt(e.target.value),
                })
              }
            />
          </label>
          <label>
            Countdown time (sec.)
            <input
              type="number"
              value={settings.timer}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  timer: parseInt(e.target.value),
                })
              }
            />
          </label>
          <label>
            Bad guesses limit
            <input
              type="number"
              value={settings.badGuessesLimit}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  badGuessesLimit: parseInt(e.target.value),
                })
              }
            />
          </label>
          <label>
            Flip back timeout (sec.)
            <input
              type="number"
              value={settings.flipBackTimeout}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  flipBackTimeout: parseInt(e.target.value),
                })
              }
            />
          </label>
          <label>
            User name
            <input
              type="text"
              value={settings.userName}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  userName: e.target.value,
                })
              }
            />
          </label>
        </div>
        <div className="modal-footer">
          <button
            className="save-button"
            onClick={() => {
              onSave();
              onClose();
            }}
          >
            SAVE SETTINGS
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default GameSettingsModal;
