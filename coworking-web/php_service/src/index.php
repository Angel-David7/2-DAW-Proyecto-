<?php
declare(strict_types=1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use GuzzleHttp\Client;

require __DIR__ . '/../vendor/autoload.php';

// URL remota del manual de usuario
const MANUAL_URL = 'https://tu-dominio.com/manuales/manual-usuario.pdf';

// Crear la aplicación Slim
$app = AppFactory::create();

// Endpoint para descargar el manual
$app->get('/manual', function (Request $request, Response $response) {
    $client = new Client([
        'verify'  => false,    // para dev con certificados autofirmados
        'timeout' => 10.0
    ]);

    try {
        // Petición al origen del PDF
        $remote = $client->request('GET', MANUAL_URL);
        $body   = $remote->getBody()->getContents();

        // Devolver PDF como descarga
        // Slim PSR-7 Body factory
        $stream = new \Slim\Psr7\Stream(fopen('php://temp', 'r+'));
        $stream->write($body);
        $stream->rewind();

        return $response
            ->withHeader('Content-Type', 'application/pdf')
            ->withHeader('Content-Disposition', 'attachment; filename="manual-usuario.pdf"')
            ->withBody($stream);

    } catch (\Exception $e) {
        $error = [
            'error'   => 'No se pudo descargar el manual',
            'details' => $e->getMessage()
        ];
        $payload = json_encode($error, JSON_UNESCAPED_UNICODE);
        $response->getBody()->write($payload);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(502);
    }
});

$app->run();