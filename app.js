document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const tabs = document.querySelectorAll('.tab');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active nav item
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab based on data-tab attribute
            const tabName = this.getAttribute('data-tab');
            
            // Handle special cases for nav items
            if (tabName === 'channel') {
                // Show main menu by default
                hideAllTabs();
                document.querySelector('.menu-section').style.display = 'block';
            } else if (tabName === 'support') {
                // For support, we'll show transactions
                hideAllTabs();
                document.getElementById('transactionHistoryTab').style.display = 'block';
            } else if (tabName === 'profile') {
                // Show profile tab
                hideAllTabs();
                document.getElementById('profileTab').style.display = 'block';
            }
        });
    });
    
    // Menu item clicks
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Handle each menu item differently
            switch(index) {
                case 0: // Channels
                    hideAllTabs();
                    document.getElementById('ratingsTab').style.display = 'block';
                    break;
                case 1: // Currencies
                    hideAllTabs();
                    document.getElementById('statisticsTab').style.display = 'block';
                    break;
                case 2: // Coins
                    showModal('donationModal');
                    break;
                case 3: // Networks
                    hideAllTabs();
                    document.getElementById('transactionHistoryTab').style.display = 'block';
                    break;
                case 4: // Charity
                    showModal('charityModal');
                    break;
            }
        });
    });
    
    // Donation Modal
    setupDonationModal();
    
    // Payment Method Modal
    setupPaymentMethodModal();
    
    // Channel Modal
    setupChannelModal();
    
    // Charity Modal
    setupCharityModal();
    
    // Stat Tab Navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            tabButtons.forEach(button => button.classList.remove('active'));
            this.classList.add('active');
            
            // Toggle between stats and settings content
            if (index === 0) {
                // Show stats content
                document.querySelector('.user-link').style.display = 'block';
                document.querySelector('.subscription-info').style.display = 'flex';
                document.querySelector('.channel-info').style.display = 'flex';
                document.querySelector('.expiry-info').style.display = 'block';
                document.querySelector('.stats-container').style.display = 'block';
                document.querySelector('.transaction-tabs').style.display = 'flex';
                document.querySelector('.transaction-list').style.display = 'block';
            } else {
                // Show settings content (not implemented in this demo)
                document.querySelector('.user-link').style.display = 'block';
                document.querySelector('.subscription-info').style.display = 'flex';
                document.querySelector('.channel-info').style.display = 'flex';
                document.querySelector('.expiry-info').style.display = 'block';
                document.querySelector('.stats-container').style.display = 'none';
                document.querySelector('.transaction-tabs').style.display = 'none';
                document.querySelector('.transaction-list').style.display = 'none';
            }
        });
    });
    
    // Transaction tab navigation
    const transactionTabs = document.querySelectorAll('.transaction-tab');
    
    transactionTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            transactionTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Toggle between earnings and payments (Just a mock for the demo)
            // In a real app, you would load different data here
        });
    });
    
    // Copy partner link button
    const copyBtn = document.querySelector('.copy-btn');
    
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const linkInput = document.querySelector('.link-container input');
            linkInput.select();
            document.execCommand('copy');
            
            // Show a quick "Copied" feedback
            this.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                this.innerHTML = '<i class="far fa-copy"></i>';
            }, 2000);
        });
    }
    
    // Charity button
    const charityBtn = document.querySelector('.charity-btn');
    
    if (charityBtn) {
        charityBtn.addEventListener('click', function() {
            showModal('charityModal');
        });
    }
    
    // Connect channel button
    const connectChannelBtns = document.querySelectorAll('.action-btn');
    
    connectChannelBtns.forEach(btn => {
        if (btn.textContent.trim().includes('Подключить свой канал')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showModal('channelModal');
            });
        } else if (btn.textContent.trim().includes('Аирдроп за Донат')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showModal('donationModal');
            });
        }
    });
    
    // Set up back button behavior
    const backBtn = document.querySelector('.back-btn');
    
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if any modal is open
            const openModal = document.querySelector('.modal[style*="display: block"]');
            if (openModal) {
                openModal.style.display = 'none';
                return;
            }
            
            // Check if we're in a tab other than menu section
            const menuSection = document.querySelector('.menu-section');
            if (menuSection.style.display === 'none') {
                hideAllTabs();
                menuSection.style.display = 'block';
                
                // Reset nav active state
                navItems.forEach(navItem => {
                    if (navItem.getAttribute('data-tab') === 'channel') {
                        navItem.classList.add('active');
                    } else {
                        navItem.classList.remove('active');
                    }
                });
            }
        });
    }
    
    // Helper Functions
    function hideAllTabs() {
        // Hide menu section
        document.querySelector('.menu-section').style.display = 'none';
        
        // Hide all tabs
        tabs.forEach(tab => tab.style.display = 'none');
    }
    
    function showModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
        
        // Close modal when clicking on close button
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    function setupDonationModal() {
        const modal = document.getElementById('donationModal');
        
        if (!modal) return;
        
        // Amount buttons
        const amountBtns = modal.querySelectorAll('.amount-btn:not(.disabled)');
        const amountInput = modal.querySelector('.amount-input input');
        
        amountBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Extract the numeric value
                const amount = parseInt(this.textContent.replace(/[^\d]/g, ''));
                amountInput.value = amount;
            });
        });
        
        // Continue button
        const continueBtn = modal.querySelector('.continue-btn');
        
        if (continueBtn) {
            continueBtn.addEventListener('click', function() {
                // Close donation modal
                modal.style.display = 'none';
                
                // Show payment method modal
                showModal('paymentMethodModal');
            });
        }
    }
    
    function setupPaymentMethodModal() {
        const modal = document.getElementById('paymentMethodModal');
        
        if (!modal) return;
        
        // Payment methods
        const paymentMethods = modal.querySelectorAll('.payment-method');
        
        paymentMethods.forEach(method => {
            method.addEventListener('click', function() {
                paymentMethods.forEach(m => m.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Pay button
        const payBtn = modal.querySelector('.pay-btn');
        
        if (payBtn) {
            payBtn.addEventListener('click', function() {
                // Simulate payment processing
                this.textContent = 'Обработка...';
                
                setTimeout(() => {
                    // Show success message
                    this.textContent = 'Успешно!';
                    this.style.backgroundColor = '#4caf50';
                    
                    // Close modal after a delay
                    setTimeout(() => {
                        modal.style.display = 'none';
                        this.textContent = 'Оплатить 100 RUB';
                        this.style.backgroundColor = '';
                    }, 1500);
                }, 2000);
            });
        }
    }
    
    function setupChannelModal() {
        const modal = document.getElementById('channelModal');
        
        if (!modal) return;
        
        // Submit button
        const submitBtn = modal.querySelector('.submit-btn');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                // Simulate submission
                this.textContent = 'Отправка...';
                
                setTimeout(() => {
                    // Show success message
                    this.textContent = 'Отправлено!';
                    this.style.backgroundColor = '#4caf50';
                    
                    // Close modal after a delay
                    setTimeout(() => {
                        modal.style.display = 'none';
                        this.textContent = 'Отправить заявку';
                        this.style.backgroundColor = '';
                    }, 1500);
                }, 2000);
            });
        }
    }
    
    function setupCharityModal() {
        const modal = document.getElementById('charityModal');
        
        if (!modal) return;
        
        // Upload button
        const uploadBtn = modal.querySelector('.upload-btn');
        
        if (uploadBtn) {
            uploadBtn.addEventListener('click', function() {
                // In a real app, this would trigger a file upload dialog
                alert('Эта функция недоступна в демо-версии');
            });
        }
        
        // Submit button
        const submitBtn = modal.querySelector('.submit-btn');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                // Simulate submission
                this.textContent = 'Отправка...';
                
                setTimeout(() => {
                    // Show success message
                    this.textContent = 'Отправлено!';
                    this.style.backgroundColor = '#4caf50';
                    
                    // Close modal after a delay
                    setTimeout(() => {
                        modal.style.display = 'none';
                        this.textContent = 'Отправить заявку';
                        this.style.backgroundColor = '';
                    }, 1500);
                }, 2000);
            });
        }
    }
    
    // Initialize
    function init() {
        // Hide all tabs except menu section initially
        tabs.forEach(tab => tab.style.display = 'none');
        document.querySelector('.menu-section').style.display = 'block';
    }
    
    // Uncomment to start with default view
    // init();
}); 