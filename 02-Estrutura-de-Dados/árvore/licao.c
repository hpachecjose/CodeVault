/* ascii_quadtree_fixed.c
   Gera imagens ASCII aleatórias usando subdivisão quadtree-like.
   Compilar: gcc -Wall -O2 -o ascii_quadtree_fixed ascii_quadtree_fixed.c
   Executar: ./ascii_quadtree_fixed [largura altura seed]
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>  /* <--- necessário para strlen */
#include <time.h>

typedef struct {
    int x, y, w, h;
} Rect;

const char *PALETTE = " .:-=+*#%@"; /* caracteres do mais "vazio" ao mais "denso" */

void fill_region(char **buf, int width, int height, Rect r, char ch) {
    for (int yy = r.y; yy < r.y + r.h && yy < height; ++yy)
        for (int xx = r.x; xx < r.x + r.w && xx < width; ++xx)
            buf[yy][xx] = ch;
}

/* subdivide: decide aleatoriamente se preenche a região ou subdivide em 4.
   depth: profundidade atual; maxdepth controla o nível máximo.
   baseProb: probabilidade (0..100) de SUBDIVIDIR ao invés de preencher na profundidade 0.
   prob decresce com a profundidade para favorecer folhas mais baixas. */
void subdivide(char **buf, int width, int height, Rect r, int depth, int maxdepth, int baseProb, int palette_len) {
    if (r.w <= 1 || r.h <= 1 || depth >= maxdepth) {
        int idx = rand() % palette_len;
        fill_region(buf, width, height, r, PALETTE[idx]);
        return;
    }

    int prob = baseProb - (depth * (baseProb / (maxdepth + 1)));
    if (prob < 0) prob = 0;

    int roll = rand() % 100;
    if (roll >= prob) {
        int idx = rand() % palette_len;
        if (rand() % 100 < 10) idx = (idx + 1 + rand() % 3) % palette_len;
        fill_region(buf, width, height, r, PALETTE[idx]);
        return;
    }

    int hw = r.w / 2;
    int hh = r.h / 2;
    Rect q[4] = {
        {r.x,       r.y,       hw > 0 ? hw : 1, hh > 0 ? hh : 1}, /* NW */
        {r.x + hw,  r.y,       r.w - hw,       hh > 0 ? hh : 1}, /* NE */
        {r.x,       r.y + hh,  hw > 0 ? hw : 1, r.h - hh      }, /* SW */
        {r.x + hw,  r.y + hh,  r.w - hw,       r.h - hh      }  /* SE */
    };

    for (int i = 0; i < 4; ++i) {
        if ((rand() % 100) < 5 && depth > 0) {
            int idx = rand() % palette_len;
            fill_region(buf, width, height, q[i], PALETTE[idx]);
        } else {
            subdivide(buf, width, height, q[i], depth + 1, maxdepth, baseProb, palette_len);
        }
    }
}

int main(int argc, char **argv) {
    int width = 80, height = 40;
    unsigned int seed = (unsigned int)time(NULL);

    if (argc >= 3) {
        width = atoi(argv[1]);
        height = atoi(argv[2]);
        if (width < 8) width = 8;
        if (height < 4) height = 4;
    }
    if (argc >= 4) seed = (unsigned int)atoi(argv[3]);

    srand(seed);

    char **buf = (char**)malloc(sizeof(char*) * height);
    if (!buf) {
        fprintf(stderr, "Erro: falha na alocação de linhas\n");
        return 1;
    }
    for (int y = 0; y < height; ++y) {
        buf[y] = (char*)malloc(width + 1);
        if (!buf[y]) {
            fprintf(stderr, "Erro: falha na alocação da linha %d\n", y);
            /* libera o que já foi alocado */
            for (int k = 0; k < y; ++k) free(buf[k]);
            free(buf);
            return 1;
        }
        for (int x = 0; x < width; ++x) buf[y][x] = ' ';
        buf[y][width] = '\0';
    }

    int maxdepth = 6;
    int baseProb = 80;
    int palette_len = (int)strlen(PALETTE);
    if (palette_len <= 0) palette_len = 1;

    Rect root = {0, 0, width, height};
    subdivide(buf, width, height, root, 0, maxdepth, baseProb, palette_len);

    for (int y = 0; y < height; ++y) {
        printf("%s\n", buf[y]);
        free(buf[y]);
    }
    free(buf);

    fprintf(stderr, "SEED=%u  (width=%d height=%d)\n", seed, width, height);
    return 0;
}
