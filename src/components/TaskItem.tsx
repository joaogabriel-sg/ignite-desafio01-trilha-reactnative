import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { Task } from "./TasksList";

import trashIcon from "../assets/icons/trash/trash.png";
import pencilIcon from "../assets/icons/pencil/pencil.png";

interface TaskItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({
    taskId,
    taskNewTitle,
  }: {
    taskId: number;
    taskNewTitle: string;
  }) => void;
}

export function TaskItem({
  task,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitle, setTaskNewTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setTaskNewTitle(task.title);
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle });
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) textInputRef.current.focus();
      else textInputRef.current.blur();
    }
  }, [textInputRef, isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            value={taskNewTitle}
            onChangeText={setTaskNewTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.controlButtons}>
        {isEditing && (
          <TouchableOpacity
            style={{ paddingHorizontal: 12 }}
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#B2B2B2" />
          </TouchableOpacity>
        )}
        {!isEditing && (
          <TouchableOpacity
            style={{ paddingHorizontal: 12 }}
            onPress={handleStartEditing}
          >
            <Image source={pencilIcon} />
          </TouchableOpacity>
        )}

        <View
          style={{
            width: 1,
            height: 24,
            backgroundColor: "rgba(196, 196, 196, 0.24)",
          }}
        />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{
            paddingLeft: 12,
            paddingRight: 24,
            opacity: isEditing ? 0.2 : 1,
          }}
          disabled={isEditing}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  controlButtons: {
    flexDirection: "row",
  },
});
