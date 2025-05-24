<?php
declare(strict_types=1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use GuzzleHttp\Client;

require __DIR__ . '/../vendor/autoload.php';

// URL remota del manual de usuario
// const MANUAL_URL = 'https://tu-dominio.com/manuales/manual-usuario.pdf';
const MANUAL_PATH = __DIR__ . '/../manual/manual-usuario.pdf';

// Crear la aplicación Slim
$app = AppFactory::create();

// Endpoint para descargar el manual
$app->get('/manual', function (Request $request, Response $response) {
    if (!file_exists(MANUAL_PATH)) {
        $error = [
            'error'   => 'No se encontró el manual',
            'details' => MANUAL_PATH
        ];
        $payload = json_encode($error, JSON_UNESCAPED_UNICODE);
        $response->getBody()->write($payload);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(404);
    }
    $stream = new \Slim\Psr7\Stream(fopen(MANUAL_PATH, 'rb'));
    return $response
        ->withHeader('Content-Type', 'application/pdf')
        ->withHeader('Content-Disposition', 'attachment; filename="manual-usuario.pdf"')
        ->withBody($stream);
});

$app->run();