const usePreventLeave = () => {
  const handleLeave = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = '';
  };

  const enablePrevent = () => {
    window.addEventListener('beforeunload', handleLeave);
  };

  const disablePrevent = () => {
    window.removeEventListener('beforeunload', handleLeave);
  };

  return { enablePrevent, disablePrevent };
};

export default usePreventLeave;
