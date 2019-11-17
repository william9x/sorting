export async function getQuickSortAnimations(board, arr, start, end, sorting_time) {
    if (start >= end) {
        return;
    }
    let index = await partition(board, arr, start, end, sorting_time);
    Promise.all([
        await getQuickSortAnimations(board, arr, start, index - 1, sorting_time),
        await getQuickSortAnimations(board, arr, index + 1, end, sorting_time)
    ]);
}

async function partition(board, arr, start, end, sorting_time) {
    let pivotIndex = start,
        pivotValue = arr[end];

    board.pivot_cols = [end];

    for (let i = start; i < end; i++) {
        board.red_cols = [];
        board.green_cols = [];
        board.active_cols = [i];

        await sleep(sorting_time);

        if (arr[i] < pivotValue) {
            board.active_cols = [];
            board.green_cols = [];
            board.red_cols = [i, pivotIndex];

            await swap(arr, i, pivotIndex);
            await sleep(sorting_time);
            pivotIndex++;
        } else {
            board.green_cols = [i];
            await sleep(sorting_time);
        }
    }
    await swap(arr, pivotIndex, end);

    return pivotIndex;
}

function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

