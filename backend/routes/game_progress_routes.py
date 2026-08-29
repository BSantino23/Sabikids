from flask import Blueprint

from controllers.game_progress_controller import (
    get_game_progress,
    save_game_progress
)


game_progress_routes = Blueprint(
    "game_progress_routes",
    __name__
)


game_progress_routes.route(
    "/<int:user_id>/<string:game_key>",
    methods=["GET"]
)(get_game_progress)


game_progress_routes.route(
    "",
    methods=["POST"]
)(save_game_progress)
