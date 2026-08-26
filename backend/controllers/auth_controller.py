from flask import request, jsonify
from models.db import db
from models.user import User
from datetime import datetime


def register():
    data = request.get_json()

    nombre = data.get("nombre")
    apellido = data.get("apellido")
    fecha_nacimiento = data.get("fecha_nacimiento")
    colegio = data.get("colegio")
    email = data.get("email")
    password = data.get("password")

    if not nombre or not apellido or not fecha_nacimiento or not colegio or not email or not password:
        return jsonify({
            "error": "Todos los campos son obligatorios"
        }), 400

    try:
        fecha_nacimiento = datetime.strptime(
            fecha_nacimiento,
            "%Y-%m-%d"
        ).date()
    except ValueError:
        return jsonify({
            "error": "La fecha de nacimiento no es válida"
        }), 400

    usuario_existente = User.query.filter_by(email=email).first()

    if usuario_existente:
        return jsonify({
            "error": "El email ya está registrado"
        }), 409

    nuevo_usuario = User(
        nombre=nombre,
        apellido=apellido,
        fecha_nacimiento=fecha_nacimiento,
        colegio=colegio,
        email=email
    )

    nuevo_usuario.set_password(password)

    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify({
        "mensaje": "Usuario registrado correctamente",
        "usuario": nuevo_usuario.to_dict()
    }), 201

def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "error": "El email y la contraseña son obligatorios"
        }), 400

    usuario = User.query.filter_by(email=email).first()

    if not usuario:
        return jsonify({
            "error": "Email o contraseña incorrectos"
        }), 401

    if not usuario.check_password(password):
        return jsonify({
            "error": "Email o contraseña incorrectos"
        }), 401

    return jsonify({
        "mensaje": "Inicio de sesión exitoso",
        "usuario": usuario.to_dict()
    }), 200