<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateBoardRequest;
use App\Http\Requests\GetBoardRequest;
use App\Http\Requests\UpdateBoardRequest;
use App\Http\Resources\BoardResource;

use App\Models\Project;
use App\Models\Board;

class BoardController extends Controller
{
    public function createBoard(CreateBoardRequest $request)
    {
        $project = Project::find($request->project_id);

        $this->authorize('spaceAdmin', $project->space);

        $board = Board::create($request->all());

        return response()->json($board);
    }

    public function getBoard(GetBoardRequest $request)
    {
        $board = Board::with('tasks')->find($request->id);

        $this->authorize('adminOrMemberSpaceWithProjectsAccess', $board->project);

        return response()->json(new BoardResource($board));
    }

    public function updateBoard(UpdateBoardRequest $request)
    {
        $board = Board::find($request->id);

        $this->authorize('spaceAdmin', $board->project->space);

        $board->update($request->all());

        return response()->json(new BoardResource($board));
    }

    public function deleteBoard(GetBoardRequest $request)
    {
        $board = Board::find($request->id);

        $this->authorize('spaceAdmin', $board->project->space);

        $board->delete();

        return response()->json(['message' => 'Доска успешно удалена']);
    }

}
