from datetime import datetime

from models.db import db


class GameProgress(db.Model):
    __tablename__ = "game_progress"

    id_progress = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id_usuario"),
        nullable=False
    )

    game_key = db.Column(
        db.String(100),
        nullable=False
    )

    current_level = db.Column(
        db.Integer,
        nullable=False,
        default=1
    )

    max_level = db.Column(
        db.Integer,
        nullable=False,
        default=1
    )

    best_score = db.Column(
        db.Integer,
        nullable=False,
        default=0
    )

    best_moves = db.Column(
        db.Integer,
        nullable=True
    )

    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    __table_args__ = (
        db.UniqueConstraint(
            "user_id",
            "game_key",
            name="uq_user_game_progress"
        ),
    )

    def to_dict(self):
        return {
            "id_progress": self.id_progress,
            "user_id": self.user_id,
            "game_key": self.game_key,
            "current_level": self.current_level,
            "max_level": self.max_level,
            "best_score": self.best_score,
            "best_moves": self.best_moves,
            "updated_at": (
                self.updated_at.isoformat()
                if self.updated_at
                else None
            )
        }