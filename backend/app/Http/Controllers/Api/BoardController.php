<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateBoardRequest;
use App\Http\Requests\DeleteBoardRequest;
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

        $this->authorize('adminOrMemberSpaceWithProjectsAccess', $project);

        $board = Board::create($request->validated());

        return response()->json(new BoardResource($board));
    }

    public function getBoard(GetBoardRequest $request)
    {
        $board = Board::find($request->id);

        $this->authorize('adminOrMemberSpaceWithProjectsAccess', $board->project);

        return response()->json(new BoardResource($board, true));
    }

    public function updateBoard(UpdateBoardRequest $request)
    {
        $board = Board::find($request->id);

        $this->authorize('adminOrMemberSpaceWithProjectsAccess', $board->project);

        $board->update($request->validated());

        return response()->json(new BoardResource($board));
    }

    public function deleteBoard(DeleteBoardRequest $request)
    {
        $board = Board::find($request->id);

        $this->authorize('adminOrMemberSpaceWithProjectsAccess', $board->project);

        $board->delete();

        return response()->json(['message' => 'Доска успешно удалена']);
    }

}
