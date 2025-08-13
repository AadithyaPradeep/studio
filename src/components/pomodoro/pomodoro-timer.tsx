"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, RotateCw, Coffee, Brain } from "lucide-react";

type TimerMode = "work" | "shortBreak" | "longBreak";

const WORK_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

export default function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>("work");
  const [time, setTime] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      handleTimerEnd();
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, time]);

  const handleTimerEnd = () => {
    setIsActive(false);
    if (mode === 'work') {
        const newSessionCount = sessionCount + 1;
        setSessionCount(newSessionCount);
        if (newSessionCount % 4 === 0) {
            setMode('longBreak');
            setTime(LONG_BREAK_TIME);
        } else {
            setMode('shortBreak');
            setTime(SHORT_BREAK_TIME);
        }
    } else {
        setMode('work');
        setTime(WORK_TIME);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = useCallback(() => {
    setIsActive(false);
    switch (mode) {
      case "work":
        setTime(WORK_TIME);
        break;
      case "shortBreak":
        setTime(SHORT_BREAK_TIME);
        break;
      case "longBreak":
        setTime(LONG_BREAK_TIME);
        break;
    }
  }, [mode]);

  const selectMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsActive(false);
    switch (newMode) {
      case "work":
        setTime(WORK_TIME);
        break;
      case "shortBreak":
        setTime(SHORT_BREAK_TIME);
        break;
      case "longBreak":
        setTime(LONG_BREAK_TIME);
        break;
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <Card>
      <CardHeader>
          <div className="flex justify-center gap-2">
            <Button variant={mode === 'work' ? 'default' : 'ghost'} onClick={() => selectMode('work')}><Brain className="mr-2 h-4 w-4"/> Work</Button>
            <Button variant={mode === 'shortBreak' ? 'default' : 'ghost'} onClick={() => selectMode('shortBreak')}><Coffee className="mr-2 h-4 w-4"/> Short Break</Button>
            <Button variant={mode === 'longBreak' ? 'default' : 'ghost'} onClick={() => selectMode('longBreak')}><Coffee className="mr-2 h-4 w-4"/> Long Break</Button>
          </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6">
        <div className="text-8xl font-bold font-mono tracking-tighter">
          {formatTime(time)}
        </div>
        <div className="flex items-center space-x-4">
          <Button size="lg" onClick={toggleTimer} className="w-36">
            {isActive ? <Pause className="mr-2 h-5 w-5"/> : <Play className="mr-2 h-5 w-5" />}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button size="lg" variant="outline" onClick={resetTimer}>
            <RotateCw className="mr-2 h-5 w-5"/> Reset
          </Button>
        </div>
        <div className="text-muted-foreground">
            Completed sessions: {sessionCount}
        </div>
      </CardContent>
    </Card>
  );
}
