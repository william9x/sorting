export async function getBubbleSortAnimations(board, sorting_time) {
    let arr = board.cols;
    
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i; j++) {
            board.red_cols = [];
            board.green_cols = [];
            board.active_cols = [j, j + 1];

            await sleep(sorting_time);

            if (arr[j] > arr[j + 1]) {
                board.red_cols = [j, j + 1];
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                await sleep(sorting_time);
            } else {
                board.green_cols = [j, j + 1];
                await sleep(sorting_time);
            }
            
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
