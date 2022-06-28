type DaoTxController<T> = {
    rollback : () => Promise<void>
    commit : () => Promise<void>
    dao : () => T
};

export default DaoTxController;