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

        $this->authorize('adminOrMemberSpaceWithProjectsAccess', $board->project);

        $task = Task::create($request->validated());

        return response()->json($task);
    }

    public function updateTask(UpdateTaskRequest $request)
    {
        $task = Task::find($request->id);

        $this->authorize('adminOrMemberSpaceWithProjectsAccess', $task->board->project);

        $task->update($request->validated());

        return response()->json(new TaskResource($task));
    }

    public function deleteTask(DeleteTaskRequest $request)
    {
        $task = Task::find($request->id);

        $this->authorize('adminOrMemberSpaceWithProjectsAccess', $task->board->project);

        $task->delete();

        return response()->json(['message' => 'Задача успешно удалена']);
    }

}
