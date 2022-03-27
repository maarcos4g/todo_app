type TodoDataType = {
    id: string;
    content: string;
}

export function getTodosInLocalStorage(key: string) {
    const myTodos = localStorage.getItem(key);

    let todosSaves = myTodos !== null && JSON.parse(myTodos) || [];

    return todosSaves;
}

export async function saveTodosInLocalStorage(key: string, value: TodoDataType) {
    let todosStored: TodoDataType[] = await getTodosInLocalStorage(key);

    const hasTodo = todosStored.some(todo => todo?.content === value?.content);

    if (hasTodo) {
        alert('Você já cadastrou uma tarefa com um conteudo igual.');
    }

    todosStored.push(value);
    localStorage.setItem(key, JSON.stringify(todosStored));
}

export function deleteTodoInLocalStorage(item: TodoDataType[], id: string) {
    let myTodos = item.filter(item => {
        return (item.id !== id)
    });

    localStorage.setItem('@todoData', JSON.stringify(myTodos));
    alert('Tarefa deletada com sucesso!');

    return myTodos;
}
