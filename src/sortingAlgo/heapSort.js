export async function getHeapSortAnimations(board, arr, sorting_time) {
    let arrLength = arr.length;

    for (let i = Math.floor(arrLength / 2); i >= 0; i -= 1) {
        await maxHeap(board, arr, i, arrLength, sorting_time);
    }

    for (let i = arrLength - 1; i > 0; i--) {
        await swap(board, arr, 0, i, sorting_time);

        arrLength--;

        await maxHeap(board, arr, 0, arrLength, sorting_time);
    }
    return arr;
}

async function maxHeap(board, arr, i, arrLength, sorting_time) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;

    if (left < arrLength && arr[left] > arr[max]) {
        max = left;
    }

    if (right < arrLength && arr[right] > arr[max]) {
        max = right;
    }

    if (max != i) {
        await swap(board, arr, i, max, sorting_time);

        await maxHeap(board, arr, max, arrLength, sorting_time);
    }
}

async function swap(board, arr, a, b, sorting_time) {
    board.active_cols = [a, b];
    await sleep(sorting_time);

    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;

    board.active_cols = [];
    board.red_cols = [a, b];
    await sleep(sorting_time);
    board.red_cols = [];
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
