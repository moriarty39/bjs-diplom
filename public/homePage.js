'use strict'


const logoutSwitch = new LogoutButton();
logoutSwitch.action = () => {
    ApiConnector.logout((response) => {
    if (response.success) {
        location.reload();
    }
});
};

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratestBoard = new RatesBoard(); 
function getRates () {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratestBoard.clearTable();
            ratestBoard.fillTable(response.data);
        }
    });
}

getRates();


const moneyOperation = new MoneyManager();  

moneyOperation.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyOperation.setMessage(false, 'Счет пополнен успешно');
        } else {
            moneyOperation.setMessage(true, response.data);
        }
    });
};

moneyOperation.conversionMoneyCallback = (data) => {      
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyOperation.setMessage(false, 'Конвертация прошла успешно');
        } else {
            moneyOperation.setMessage(true, response.data);
        }
    });
};

moneyOperation.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyOperation.setMessage(false, 'Трансфер совершен успешно');
        } else {
            moneyOperation.setMessage(true, response.data);
        }
    });
};


const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {   
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyOperation.updateUsersList(response.data);
    }
});


favoritesWidget.addUserCallback = (data) => {    
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyOperation.updateUsersList(response.data);
            favoritesWidget.setMessage(false, 'Контакт добавлен');
        } else {
            favoritesWidget.setMessage(true, response.data);
        }
    });
};

favoritesWidget.removeUserCallback = (data) => {      
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyOperation.updateUsersList(response.data);
            favoritesWidget.setMessage(false, 'Контакт удален');
        } else {
            favoritesWidget.setMessage(true, response.data);
        }
    });
};



