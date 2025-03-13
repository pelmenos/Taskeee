<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\DeleteTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

use App\Http\Resources\TaskResource;
use App\Models\Board;
use App\Models\Task;

class TaskController extends Controller
{
    public function createTask(CreateTaskRequest $request)
    {
        $board = Board::find($request->board_id);

        $this->authorize('spaceAdmin', $board->project->space);

        $task = Task::create($request->all());

        return response()->json($task);
    }

    public function updateTask(UpdateTaskRequest $request)
    {
        $task = Task::find($request->id);

        $this->authorize('spaceAdmin', $task->board->project->space);

        $task->update($request->all());

        return response()->json(new TaskResource($task));
    }

    public function deleteTask(DeleteTaskRequest $request)
    {
        $task = Task::find($request->id);

        $this->authorize('spaceAdmin', $task->board->project->space);

        $task->delete();

        return response()->json(['message' => 'Задача успешно удалена']);
    }

}
