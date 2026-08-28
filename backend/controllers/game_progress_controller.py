from flask import request, jsonify

from models.db import db
from models.user import User
from models.game_progress import GameProgress


MAX_LEVEL = 4


def get_game_progress(user_id, game_key):
    user = db.session.get(
        User,
        user_id
    )

    if not user:
        return jsonify({
            "error":
                "Usuario no encontrado"
        }), 404


    progress = GameProgress.query.filter_by(
        user_id=user_id,
        game_key=game_key
    ).first()


    if not progress:
        return jsonify({
            "user_id":
                user_id,

            "game_key":
                game_key,

            "current_level":
                1,

            "max_level":
                1,

            "best_score":
                0,

            "best_moves":
                None
        }), 200


    return jsonify(
        progress.to_dict()
    ), 200


def save_game_progress():
    data = request.get_json() or {}


    user_id = data.get(
        "user_id"
    )

    game_key = data.get(
        "game_key"
    )

    level = data.get(
        "level"
    )

    score = data.get(
        "score"
    )

    moves = data.get(
        "moves"
    )


    if (
        user_id is None
        or not game_key
        or level is None
        or score is None
        or moves is None
    ):
        return jsonify({
            "error":
                "Faltan datos obligatorios"
        }), 400


    try:
        user_id = int(
            user_id
        )

        level = int(
            level
        )

        score = int(
            score
        )

        moves = int(
            moves
        )

    except (
        TypeError,
        ValueError
    ):
        return jsonify({
            "error":
                "Los datos numéricos no son válidos"
        }), 400


    if (
        level < 1
        or level > MAX_LEVEL
    ):
        return jsonify({
            "error":
                "Nivel no válido"
        }), 400


    if (
        score < 0
        or moves < 1
    ):
        return jsonify({
            "error":
                "Los valores enviados no son válidos"
        }), 400


    user = db.session.get(
        User,
        user_id
    )


    if not user:
        return jsonify({
            "error":
                "Usuario no encontrado"
        }), 404


    progress = GameProgress.query.filter_by(
        user_id=user_id,
        game_key=game_key
    ).first()


    next_level = min(
        level + 1,
        MAX_LEVEL
    )


    if not progress:

        progress = GameProgress(
            user_id=user_id,
            game_key=game_key,
            current_level=next_level,
            max_level=next_level,
            best_score=score,
            best_moves=moves
        )

        db.session.add(
            progress
        )

    else:

        progress.current_level = max(
            progress.current_level,
            next_level
        )


        progress.max_level = max(
            progress.max_level,
            next_level
        )


        if (
            score >
            progress.best_score
        ):
            progress.best_score = (
                score
            )


        if (
            progress.best_moves is None
            or moves <
            progress.best_moves
        ):
            progress.best_moves = (
                moves
            )


    db.session.commit()


    return jsonify({
        "mensaje":
            "Progreso guardado correctamente",

        "progreso":
            progress.to_dict()
    }), 200