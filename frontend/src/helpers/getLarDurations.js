const getDurations = async (audioFiles, setDurations) => {
  const durations = [];
  for (const audio of audioFiles) {
    const duration = await new Promise(
      (r) =>
        (new Audio(audio).onloadedmetadata = function () {
          r(this.duration);
        }),
    );

    const interval = duration * 2 * 1000;
    durations.push(interval);
  }

  setDurations(durations);
};

export default getDurations;
