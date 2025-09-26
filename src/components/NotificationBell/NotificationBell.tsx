import { useEffect, useState } from 'react';
import { Menu, Text } from '@mantine/core';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import './NotificationBell.css'; // Стили можешь адаптировать под себя

export function NotificationBell({ userId, getProgressData }) {
  const [notifCount, setNotifCount] = useState(0);
  const [notifHistory, setNotifHistory] = useState([]);

  // Инициализация из localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem('notifCount');
    const savedHistory = JSON.parse(localStorage.getItem('notifHistory') || '[]');

    if (savedCount) setNotifCount(Number(savedCount));
    setNotifHistory(savedHistory);
  }, []);

  // Polling — проверка новых данных каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!userId || !getProgressData) return;

      try {
        const completed = getProgressData[0].filter(
          (item) => item.studentId === userId && item.progress === 100
        );

        if (completed.length > notifCount) {
          const newNotifs = completed.slice(notifCount).map((item) => ({
            id: item.id,
            text: `Модуль ${item.module || item.id} завершен!`,
            time: new Date().toISOString(),
          }));

          const updatedHistory = [...newNotifs, ...notifHistory].slice(0, 10);

          setNotifCount(completed.length);
          setNotifHistory(updatedHistory);

          localStorage.setItem('notifCount', completed.length.toString());
          localStorage.setItem('notifHistory', JSON.stringify(updatedHistory));

          // newNotifs.forEach((n) => toast(n.text));
        }
      } catch (err) {
        console.error('Ошибка при получении прогресса:', err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [userId, getProgressData, notifCount, notifHistory]);

  const handleReset = () => {
    setNotifCount(0);
    localStorage.setItem('notifCount', '0');
  };

  return (
    <>
      <Menu width={300} shadow="md" position="bottom-end">
        <Menu.Target>
          <div className="notif-bell-wrapper" onClick={handleReset}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
            </svg>
            {notifCount > 0 && <span className="notif-count">{notifCount}</span>}
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Последние уведомления</Menu.Label>
          {notifHistory.length === 0 ? (
            <Menu.Item disabled>Нет новых уведомлений</Menu.Item>
          ) : (
            notifHistory.map((item) => (
              <Menu.Item key={item.id}>
                <Text size="sm">{item.text}</Text>
                <Text size="xs" c="dimmed">
                  {new Date(item.time).toLocaleTimeString()}
                </Text>
              </Menu.Item>
            ))
          )}
        </Menu.Dropdown>
      </Menu>

      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </>
  );
}
