import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [visibleTasks, setVisibleTasks] = useState([]);
  const [query, setQuery] = useState('');
  const [activeTask, setActiveTask] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsFetching(true);
    setAlertMessage(null);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTasks(response.data);
      setVisibleTasks(response.data);
    } catch (error) {
      setAlertMessage('Failed to retrieve tasks. Please try again later.');
    } finally {
      setIsFetching(false);
    }
  };

  const searchTasks = (input) => {
    setQuery(input);
    if (input.trim() === '') {
      setVisibleTasks(tasks);
    } else {
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(input.toLowerCase())
      );
      setVisibleTasks(filtered);
    }
  };

  const selectTask = (id) => {
    setActiveTask(id);
  };

  if (isFetching) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={styles.fetchingText}>Loading tasks...</Text>
      </View>
    );
  }

  if (alertMessage) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.alertMessage}>{alertMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.appContainer}>
      <Text style={styles.title}>Task Overview</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for tasks..."
        placeholderTextColor="#555"
        value={query}
        onChangeText={searchTasks}
      />
      <FlatList
        data={visibleTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => selectTask(item.id)}
            style={[
              styles.taskCard,
              activeTask === item.id && styles.activeTaskCard,
            ]}
          >
            <Text style={styles.taskTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderColor: '#CCCCCC',
    color: '#333333',
    fontSize: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#6200EE',
  },
  taskCard: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activeTaskCard: {
    backgroundColor: '#BBDEFB',
  },
  taskTitle: {
    fontSize: 16,
    color: '#333333',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  fetchingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6200EE',
  },
  alertMessage: {
    color: '#D32F2F',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default TaskManager;