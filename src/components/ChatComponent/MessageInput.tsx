import React, { useState } from "react";
import { FaSmile, FaPaperclip, FaVideo, FaTimes } from "react-icons/fa";
import styles from "./MessageInput.module.css";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [filePreview, setFilePreview] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB

    if (!allowedTypes.includes(file.type)) {
      alert("Unsupported file type. Please upload a JPG, PNG, or PDF.");
      return;
    }
    if (file.size > maxFileSize) {
      alert("File size exceeds 5 MB. Please upload a smaller file.");
      return;
    }

    // Generate a preview URL for the file
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreviewUrl(null);
    }

    setFilePreview(file);
  };

  const handleUploadFile = () => {
    if (filePreview) {
      alert(`File "${filePreview.name}" uploaded successfully!`);
      setFilePreview(null);
      setFilePreviewUrl(null);
    }
  };

  const handleCancelUpload = () => {
    setFilePreview(null);
    setFilePreviewUrl(null);
  };

  const handleShareMeetingLink = () => {
    const link = prompt("Enter the meeting link to share:");
    if (link) {
      onSendMessage(`Meeting link shared: ${link}`);
    }
  };

  return (
    <div className={styles.messageInput}>
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className={styles.emojiPicker}>
          {["😊", "😂", "❤️", "👍", "😢", "🎉", "🔥", "💯"].map((emoji) => (
            <span
              key={emoji}
              className={styles.emoji}
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </span>
          ))}
        </div>
      )}

      {/* File Preview Window */}
      {filePreview && (
        <div className={styles.filePreview}>
          <div className={styles.fileContent}>
            {filePreviewUrl ? (
              <img src={filePreviewUrl} alt="Preview" className={styles.previewImage} />
            ) : (
              <p className={styles.filePlaceholder}>{filePreview.name}</p>
            )}
          </div>
          <div className={styles.fileActions}>
            <button className={styles.uploadButton} onClick={handleUploadFile}>
              Upload
            </button>
            <button className={styles.cancelButton} onClick={handleCancelUpload}>
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      <button
        className={styles.iconButton}
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        <FaSmile />
      </button>
      &nbsp;

      <button className={styles.iconButton} onClick={handleShareMeetingLink}>
        <FaVideo />
      </button>
      &nbsp;

      <label className={styles.iconButton}>
        <FaPaperclip />
        <input
          type="file"
          className={styles.fileInput}
          onChange={handleFileChange}
        />
      </label>
      &nbsp;

      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className={styles.sendButton}
        onClick={handleSend}
        disabled={!message.trim()}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
